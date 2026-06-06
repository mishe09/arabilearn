// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '@/contexts/AuthContext';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Menu,
//   X,
//   Home,
//   BookOpen,
//   Trophy,
//   User,
//   Crown,
//   LogOut,
//   ChevronRight,
//   Flame,
//   Sparkles,
// } from 'lucide-react';

// const navItems = [
//   { href: '/dashboard', label: 'Dashboard', icon: Home },
//   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
//   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
//   { href: '/dashboard/profile', label: 'Profile', icon: User },
// ];

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const pathname = usePathname();
//   const { user, logout } = useAuth();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
//         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden">
      
//       {/* GOLD GRID BACKGROUND */}
//       <div
//         className="fixed inset-0 z-0"
//         style={{
//           backgroundColor: '#064E3B',
//           backgroundImage: `
//             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
//           `,
//           backgroundSize: '44px 44px',
//         }}
//       />

//       {/* Decorative glow */}
//       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
//         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
//       </div>

//       {/* Mobile sidebar overlay */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar */}
//       <motion.aside
//         initial={{ x: -280 }}
//         animate={{ x: sidebarOpen ? 0 : -280 }}
//         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         className="fixed left-0 top-0 z-50 h-full w-72 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl lg:translate-x-0"
//       >
//         <div className="flex h-full flex-col">
//           {/* Sidebar Header */}
//           <div className="flex items-center justify-between p-5 border-b border-white/20">
//             <Link href="/dashboard" className="flex items-center gap-2">
//               <Crown className="h-7 w-7 text-amber-400" />
//               <span className="text-xl font-bold text-white">Arabi<span className="text-amber-400">Learn</span></span>
//             </Link>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           {/* User Info */}
//           <div className="border-b border-white/20 p-5">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
//                 <span className="text-lg font-bold text-amber-300">
//                   {user?.displayName?.[0] || 'M'}
//                 </span>
//               </div>
//               <div>
//                 <p className="font-medium text-white">{user?.displayName || 'Musa'}</p>
//                 <p className="text-xs text-amber-300/70 flex items-center gap-1">
//                   <Flame className="h-3 w-3" />
//                   5 day streak
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 space-y-1 p-4">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
//                     isActive
//                       ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
//                       : 'text-white/70 hover:bg-white/10 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="h-5 w-5" />
//                   {item.label}
//                   {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Upgrade Button */}
//           {!user?.hasPremium && (
//             <div className="border-t border-white/20 p-4">
//               <Link
//                 href="/dashboard/subscription"
//                 className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg"
//               >
//                 <Sparkles className="h-4 w-4" />
//                 Upgrade to Premium
//                 <ChevronRight className="ml-auto h-4 w-4" />
//               </Link>
//             </div>
//           )}

//           {/* Logout */}
//           <div className="border-t border-white/20 p-4">
//             <button
//               onClick={logout}
//               className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-red-300"
//             >
//               <LogOut className="h-5 w-5" />
//               Logout
//               <ChevronRight className="ml-auto h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       </motion.aside>

//       {/* Main Content */}
//       <div className="lg:pl-72">
//         {/* Top Navbar */}
//         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
//           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//             <div className="flex items-center gap-4 ml-auto">
//               {/* Premium badge */}
//               {!user?.hasPremium && (
//                 <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-300 border border-amber-400/30">
//                   <Crown className="h-3 w-3" />
//                   Free Trial
//                 </span>
//               )}
//               {/* Avatar */}
//               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
//                 <span className="text-sm font-bold text-amber-300">
//                   {user?.displayName?.[0] || 'M'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="relative z-10 p-4 lg:p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Menu,
  X,
  Home,
  BookOpen,
  Trophy,
  User,
  Crown,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Flame,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sidebar is collapsed by default on desktop (width: 80px)
  // When hovered or open state is true, it expands to 280px
  const isExpanded = sidebarOpen || isHovered;

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-900">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* GOLD GRID BACKGROUND */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: '#064E3B',
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Decorative glow */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Collapsible on desktop */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed left-0 top-0 z-50 h-full 
          bg-white/10 backdrop-blur-xl 
          border-r border-white/20 shadow-2xl 
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
          lg:block
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header - Logo Area */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            {(sidebarOpen || isExpanded) ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Crown className="h-7 w-7 text-amber-400" />
                  <span className="text-xl font-bold text-white">
                    Arabi<span className="text-amber-400">Learn</span>
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="flex items-center justify-center w-full">
                  <Crown className="h-7 w-7 text-amber-400" />
                </Link>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info - Condensed when collapsed */}
          <div className="border-b border-white/20 p-4">
            <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
                <span className="text-lg font-bold text-amber-300">
                  {user?.displayName?.[0] || 'M'}
                </span>
              </div>
              {(sidebarOpen || isExpanded) && (
                <div className="overflow-hidden">
                  <p className="font-medium text-white truncate">{user?.displayName || 'Musa'}</p>
                  <p className="text-xs text-amber-300/70 flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    5 day streak
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }
                    ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
                  `}
                  title={!(sidebarOpen || isExpanded) ? item.label : ''}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {(sidebarOpen || isExpanded) && (
                    <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
                  )}
                  {isActive && (sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          {/* Upgrade Button - Condensed when collapsed */}
          {!user?.hasPremium && (
            <div className="border-t border-white/20 p-3">
              <Link
                href="/dashboard/subscription"
                className={`
                  flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
                  ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
                `}
                title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
              >
                <Sparkles className="h-4 w-4 flex-shrink-0" />
                {(sidebarOpen || isExpanded) && (
                  <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
                )}
                {(sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            </div>
          )}

          {/* Logout Button - Condensed when collapsed */}
          <div className="border-t border-white/20 p-3">
            <button
              onClick={logout}
              className={`
                flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-red-300
                ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
              `}
              title={!(sidebarOpen || isExpanded) ? 'Logout' : ''}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {(sidebarOpen || isExpanded) && (
                <span className="overflow-hidden whitespace-nowrap">Logout</span>
              )}
              {(sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Logo on navbar when sidebar is collapsed on desktop */}
              <div className="hidden lg:flex items-center gap-2">
                <Crown className="h-6 w-6 text-amber-400" />
                {(sidebarOpen || isHovered) ? null : (
                  <span className="text-lg font-bold text-white">
                    Arabi<span className="text-amber-400">Learn</span>
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {!user?.hasPremium && (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-300 border border-amber-400/30">
                  <Crown className="h-3 w-3" />
                  Free Trial
                </span>
              )}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
                <span className="text-sm font-bold text-amber-300">
                  {user?.displayName?.[0] || 'M'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}