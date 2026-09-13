'use client';

import { useState } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  GraduationCap,
  Heart,
  Landmark,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';

const BANK_DETAILS = {
  accountName: 'HAUSAARABIA',
  bankName: 'TAJBank',
  accountNumber: '2477698302',
};

const IMPACT_AREAS = [
  {
    icon: BookOpen,
    title: 'Better learning content',
    description:
      'Help us improve lessons, explanations, exercises and learning resources for Hausa-speaking learners.',
  },
  {
    icon: GraduationCap,
    title: 'More access to learning',
    description:
      'Support the tools and technology that help more learners study Arabic wherever they are.',
  },
  {
    icon: Users,
    title: 'Community programmes',
    description:
      'Help HausaArabia organise learning activities, community events and programmes that bring people together.',
  },
];

export default function DonatePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyValue = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      toast.success(`${label} copied`);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      toast.error('Could not copy. Please copy it manually.');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero */}
      <section className="relative min-h-[410px] overflow-hidden rounded-3xl border border-white/10 bg-emerald-950 shadow-2xl md:min-h-[500px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/donation-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-emerald-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/10" />

        <div className="relative z-10 flex min-h-[410px] max-w-2xl flex-col justify-end p-6 sm:p-8 md:min-h-[500px] md:p-10">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1.5 text-xs font-semibold text-amber-300 ring-1 ring-amber-300/20 backdrop-blur-sm">
            <Heart className="h-3.5 w-3.5 fill-current" />
            Support HausaArabia
          </div>

          <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Your generosity helps
            <span className="block text-amber-300">
              more people learn and grow.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
            Every contribution helps us improve Arabic learning resources,
            expand access, support community programmes and build stronger
            connections between Hausa and Arabic-speaking communities.
          </p>

          <a
            href="#donate"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-amber-500/10 transition hover:-translate-y-0.5 hover:bg-amber-300"
          >
            <Heart className="h-4 w-4 fill-current" />
            Make a donation
          </a>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400/70">
          <Sparkles className="h-4 w-4" />
          Give with purpose
        </div>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          Help us keep building HausaArabia
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/50 sm:text-base">
          HausaArabia is building a learning community for students,
          professionals, workers, families and anyone who wants a stronger
          connection between Hausa and Arabic. Your support helps us keep that
          work moving forward.
        </p>
      </section>

      {/* Impact */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {IMPACT_AREAS.map((area) => {
          const Icon = area.icon;

          return (
            <article
              key={area.title}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300 ring-1 ring-amber-300/15">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold text-white">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/45">
                {area.description}
              </p>
            </article>
          );
        })}
      </section>

      {/* Donation section */}
      <section
        id="donate"
        className="grid scroll-mt-24 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_420px]"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/15">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400/65">
                Your support matters
              </p>
              <h2 className="text-xl font-bold text-white">
                What your donation helps us do
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {[
              'Create and improve structured Arabic learning content for Hausa speakers.',
              'Maintain the technology and learning tools used across the platform.',
              'Develop new exercises, audio resources and educational materials.',
              'Support community programmes, outreach and HausaArabia events.',
              'Reach more learners across Northern Nigeria, Africa and Arabic-speaking communities.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                  <Check className="h-3.5 w-3.5 text-emerald-300" />
                </div>
                <p className="text-sm leading-6 text-white/55">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-amber-300/10 bg-amber-400/[0.06] p-4">
            <p className="text-sm leading-6 text-amber-100/70">
              Donations are voluntary contributions to support HausaArabia.
              They are separate from Premium membership and do not unlock
              paid lessons or subscription benefits.
            </p>
          </div>
        </div>

        {/* Bank details */}
        <aside className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-400/10 via-white/[0.06] to-emerald-400/[0.08] p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400/70">
                Bank transfer
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                Donate directly
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/45">
                Use the account details below to make a voluntary contribution
                to HausaArabia.
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/15">
              <Landmark className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <DetailRow
              label="Account name"
              value={BANK_DETAILS.accountName}
              copied={copied === 'Account name'}
              onCopy={() =>
                void copyValue('Account name', BANK_DETAILS.accountName)
              }
            />

            <DetailRow
              label="Bank"
              value={BANK_DETAILS.bankName}
              copied={copied === 'Bank name'}
              onCopy={() =>
                void copyValue('Bank name', BANK_DETAILS.bankName)
              }
            />

            <DetailRow
              label="Account number"
              value={BANK_DETAILS.accountNumber}
              emphasize
              copied={copied === 'Account number'}
              onCopy={() =>
                void copyValue(
                  'Account number',
                  BANK_DETAILS.accountNumber,
                )
              }
            />
          </div>

          <button
            type="button"
            onClick={() =>
              void copyValue(
                'Account number',
                BANK_DETAILS.accountNumber,
              )
            }
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
          >
            {copied === 'Account number' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied === 'Account number'
              ? 'Account number copied'
              : 'Copy account number'}
          </button>

          <div className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            <p className="text-xs leading-5 text-white/35">
              Please confirm the account name displayed by your banking app
              before completing a transfer. Keep your transfer receipt for
              your records.
            </p>
          </div>
        </aside>
      </section>

      {/* Closing message */}
      <section className="rounded-3xl border border-emerald-300/10 bg-emerald-400/[0.05] px-6 py-8 text-center sm:px-10">
        <Heart className="mx-auto h-7 w-7 fill-current text-amber-300" />
        <h2 className="mt-3 text-xl font-bold text-white">
          Thank you for believing in the mission.
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/45">
          Whether you donate, learn, share HausaArabia with someone, or
          encourage another learner, you are helping the community grow.
        </p>
      </section>
    </div>
  );
}

function DetailRow({
  label,
  value,
  onCopy,
  copied,
  emphasize = false,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
  emphasize?: boolean;
}) {
  return (
    <div className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-emerald-950/25 px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
          {label}
        </p>
        <p
          className={`mt-1 truncate font-semibold text-white ${
            emphasize ? 'text-xl tracking-wider' : 'text-sm'
          }`}
        >
          {value}
        </p>
      </div>

      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label}`}
        title={`Copy ${label}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-amber-300/30 hover:bg-amber-400/10 hover:text-amber-300"
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
