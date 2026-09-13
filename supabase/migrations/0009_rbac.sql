-- =====================================================================
-- 0009_rbac.sql
-- Permission-based admin model: roles, permissions, role_permissions,
-- user_roles, user_permissions (per-user overrides)
-- =====================================================================

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  name app_role not null unique,
  description text
);

create table public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique, -- e.g. 'curriculum.create'
  description text
);

create table public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table public.user_roles (
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

-- Optional per-user permission overrides (grant a one-off permission
-- without assigning a whole role).
create table public.user_permissions (
  user_id uuid not null references public.profiles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  granted_at timestamptz not null default now(),
  primary key (user_id, permission_id)
);

create index idx_user_roles_user on public.user_roles(user_id);
create index idx_user_permissions_user on public.user_permissions(user_id);

-- ---------------------------------------------------------------------
-- Helper functions used throughout RLS policies.
-- SECURITY DEFINER + stable so they can be used cheaply inside policies.
-- ---------------------------------------------------------------------

-- Does the given user (default: current auth user) hold a specific permission,
-- either directly (user_permissions) or via one of their roles?
create or replace function public.has_permission(permission_code text, uid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.role_permissions rp on rp.role_id = ur.role_id
    join public.permissions p on p.id = rp.permission_id
    where ur.user_id = uid and p.code = permission_code
  )
  or exists (
    select 1
    from public.user_permissions up
    join public.permissions p on p.id = up.permission_id
    where up.user_id = uid and p.code = permission_code
  )
  or exists ( -- admin.full_access via role short-circuits everything
    select 1
    from public.user_roles ur
    join public.role_permissions rp on rp.role_id = ur.role_id
    join public.permissions p on p.id = rp.permission_id
    where ur.user_id = uid and p.code = 'admin.full_access'
  );
$$;

-- Does the user have a given role?
create or replace function public.has_role(role_name app_role, uid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.roles r on r.id = ur.role_id
    where ur.user_id = uid and r.name = role_name
  );
$$;

comment on function public.has_permission is
  'Checks direct user_permissions grants, role-based grants, and admin.full_access short-circuit.';
