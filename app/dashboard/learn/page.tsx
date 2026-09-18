"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Atom,
  BookOpen,
  BrainCircuit,
  Calculator,
  ChevronRight,
  Computer,
  Dna,
  FlaskConical,
  GraduationCap,
  Landmark,
  Leaf,
  LineChart,
  Map,
  Pi,
  Scale,
  Sigma,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

type Subject = {
  key: string;
  hausa: string;
  arabic: string;
  english: string;
  description: string;
  icon: typeof Calculator;
  iconClass: string;
};

const SUBJECTS: Subject[] = [
  { key:"mathematics", hausa:"Lissafi", arabic:"الرياضيات", english:"Mathematics", description:"Lambobi, algebra, geometry da problem solving.", icon:Calculator, iconClass:"bg-sky-400/15 text-sky-300 border-sky-300/20" },
  { key:"biology", hausa:"Ilimin Halittu", arabic:"الأحياء", english:"Biology", description:"Rayuwa, jiki, tsirrai, kwayoyin halitta da muhalli.", icon:Dna, iconClass:"bg-emerald-400/15 text-emerald-300 border-emerald-300/20" },
  { key:"physics", hausa:"Kimiyyar Lissafi", arabic:"الفيزياء", english:"Physics", description:"Motsi, makamashi, haske, lantarki da ka'idojin yanayi.", icon:Atom, iconClass:"bg-violet-400/15 text-violet-300 border-violet-300/20" },
  { key:"chemistry", hausa:"Kimiyyar Sinadarai", arabic:"الكيمياء", english:"Chemistry", description:"Sinadarai, atoms, reactions da tsarin abubuwa.", icon:FlaskConical, iconClass:"bg-pink-400/15 text-pink-300 border-pink-300/20" },
  { key:"history", hausa:"Tarihi", arabic:"التاريخ", english:"History", description:"Mutane, al'ummomi, abubuwan da suka faru da darussansu.", icon:Landmark, iconClass:"bg-amber-400/15 text-amber-300 border-amber-300/20" },
  { key:"government", hausa:"Gwamnati", arabic:"الحكومة والسياسة", english:"Government", description:"Mulki, dokoki, cibiyoyi, 'yancin jama'a da siyasa.", icon:Scale, iconClass:"bg-rose-400/15 text-rose-300 border-rose-300/20" },
  { key:"economics", hausa:"Tattalin Arziki", arabic:"الاقتصاد", english:"Economics", description:"Kasuwanci, kudi, bukata, wadata da yadda tattali ke aiki.", icon:LineChart, iconClass:"bg-cyan-400/15 text-cyan-300 border-cyan-300/20" },
  { key:"geography", hausa:"Ilimin Kasa", arabic:"الجغرافيا", english:"Geography", description:"Kasa, yanayi, al'umma, taswira da muhalli.", icon:Map, iconClass:"bg-teal-400/15 text-teal-300 border-teal-300/20" },
  { key:"agriculture", hausa:"Noma", arabic:"العلوم الزراعية", english:"Agricultural Science", description:"Amfanin gona, kiwo, kasa da dabarun noma.", icon:Leaf, iconClass:"bg-lime-400/15 text-lime-300 border-lime-300/20" },
  { key:"computer-science", hausa:"Kimiyyar Kwamfuta", arabic:"علوم الحاسوب", english:"Computer Science", description:"Kwamfuta, coding, algorithms da tunanin fasaha.", icon:Computer, iconClass:"bg-indigo-400/15 text-indigo-300 border-indigo-300/20" },
  { key:"further-mathematics", hausa:"Lissafi na Ci-gaba", arabic:"الرياضيات المتقدمة", english:"Further Mathematics", description:"Advanced algebra, calculus, vectors da statistics.", icon:Sigma, iconClass:"bg-orange-400/15 text-orange-300 border-orange-300/20" },
  { key:"civic-education", hausa:"Ilimin Zama Dan Kasa", arabic:"التربية المدنية", english:"Civic Education", description:"Hakkin dan kasa, al'umma, dabi'u da zaman tare.", icon:Users, iconClass:"bg-fuchsia-400/15 text-fuchsia-300 border-fuchsia-300/20" },
];

const DECORATIONS = [
  { value:"+", className:"left-[4%] top-[13%] text-7xl rotate-12" },
  { value:"÷", className:"right-[6%] top-[24%] text-7xl -rotate-12" },
  { value:"π", className:"left-[5%] top-[58%] text-7xl -rotate-12" },
  { value:"∑", className:"right-[5%] top-[78%] text-7xl rotate-6" },
];

export default function LearnPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [email, setEmail] = useState("");
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [showAllSubjects, setShowAllSubjects] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadUserEmail() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!cancelled && user?.email) {
        setEmail(user.email);
      }
    }

    void loadUserEmail();

    return () => {
      cancelled = true;
    };
  }, []);

  async function joinWaitlist(
    event: FormEvent<HTMLFormElement>,
    subject?: Subject | null,
  ) {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !/\S+@\S+\.\S+/.test(cleanEmail)) {
      toast.error("Ka shigar da ingantaccen adireshin imel.");
      return;
    }

    setJoining(true);

    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("Sai ka shiga asusunka kafin ka shiga jerin jira.");
        return;
      }

      const { error } = await supabase.from("learning_waitlist").upsert(
        {
          user_id: user.id,
          email: cleanEmail,
          subject_interest: subject?.key ?? "general",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

      if (error) throw error;

      setJoined(true);
      toast.success("An saka ka cikin jerin jira.");
    } catch (error) {
      console.error("Learning waitlist error:", error);
      toast.error("Ba mu iya saka ka cikin jerin jira ba. Ka sake gwadawa.");
    } finally {
      setJoining(false);
    }
  }

  function openSubject(subject: Subject) {
    setSelectedSubject(subject);
    setJoined(false);
  }

  const SelectedIcon = selectedSubject?.icon ?? Calculator;

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {DECORATIONS.map((item) => (
          <span
            key={`${item.value}-${item.className}`}
            aria-hidden="true"
            className={`absolute select-none font-serif font-bold text-amber-300/[0.11] ${item.className}`}
          >
            {item.value}
          </span>
        ))}

        <Dna className="absolute left-[3%] top-[35%] h-24 w-24 -rotate-12 text-amber-300/[0.10]" />
        <Atom className="absolute right-[3%] top-[48%] h-28 w-28 rotate-12 text-amber-300/[0.11]" />
        <FlaskConical className="absolute left-[4%] top-[82%] h-22 w-22 rotate-6 text-amber-300/[0.09]" />
        
      </div>

      <div className="relative z-10">
        <section className="pt-0">
          <div className="relative mx-auto min-h-[560px] max-w-7xl overflow-hidden rounded-[30px]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/learn-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />


            <div className="relative flex min-h-[560px] items-center px-6 py-14 sm:px-10 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl [text-shadow:0_2px_10px_rgba(0,0,0,0.72)]"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/20 px-4 py-2 text-sm font-medium text-amber-200 backdrop-blur-xl">
                  <Sparkles className="h-4 w-4" />
                  Cradle of learning on HausaArabia
                </span>

                <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  HausaArabia <span className="text-amber-400">Learn</span>
                </h1>

                <p className="mt-5 max-w-xl text-xl font-medium leading-8 text-emerald-50">
                  Koyi darussan makaranta daga Hausa zuwa Larabci.
                </p>

                <p lang="ar" dir="rtl" className="mt-3 max-w-xl text-right text-2xl leading-9 text-amber-100">
                  تعلّم المواد الدراسية من الهوسا إلى العربية
                </p>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                  A future learning space for students, adults and working
                  professionals who want difficult subjects explained clearly,
                  while building useful Arabic academic vocabulary.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-xl bg-amber-400 px-5 py-3 font-semibold text-emerald-950">
                    Coming Soon
                  </span>

                  <a
                    href="#subjects"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
                  >
                    Duba darussa
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
                Daga fahimta zuwa ƙwarewa
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Wuri guda domin koyon abubuwan da ke bukatar karin bayani.
              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-emerald-50/65">
                HausaArabia Learn zai haɗa bayani cikin Hausa, kalmomin ilimi
                cikin Larabci, darussa masu tsari, misalai da malamai. Manufar
                ita ce mai koyo ya fahimci darasi, ba wai ya haddace shi kawai
                ba.
              </p>
            </div>

            <div className="rounded-[26px] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl">
              <GraduationCap className="h-9 w-9 text-amber-300" />
              <h3 className="mt-4 text-xl font-semibold">
                Ka iya wani darasi sosai?
              </h3>
              <p className="mt-3 leading-7 text-emerald-50/65">
                Teacher onboarding zai zo nan gaba. Masu ilimi za su samu
                damar koyarwa, amma wannan shafin yana fara ne da abin da mai
                koyo yake bukata.
              </p>
              <p lang="ar" dir="rtl" className="mt-4 border-t border-white/10 pt-4 text-right text-sm leading-7 text-amber-100/75">
                وسيتمكن المدرسون المؤهلون قريباً من الانضمام وتقديم الدروس للمتعلمين.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon:BookOpen, title:"Bayani cikin Hausa", text:"A fara daga harshen da mai koyo ya fi fahimta." },
              { icon:BrainCircuit, title:"Kwarewar ilimi", text:"Darussa, misalai da tambayoyi da ke gina fahimta." },
              { icon:GraduationCap, title:"Arabic academic bridge", text:"A hankali ka koyi kalmomin ilimi da tsarin bayani cikin Larabci." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur-xl">
                <Icon className="h-6 w-6 text-amber-300" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50/55">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="subjects" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
                Fannonin karatu
              </p>
              <h2 className="mt-2 text-3xl font-bold">Me kake son koya?</h2>
              <p lang="ar" dir="rtl" className="mt-2 text-right text-lg text-amber-100/75 sm:text-left">
                ماذا تريد أن تتعلم؟
              </p>
            </div>

            <p className="max-w-xl text-sm leading-6 text-emerald-50/55">
              Danna kowane darasi domin ganin bayanin Coming Soon da shiga
              jerin jira.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(showAllSubjects ? SUBJECTS : SUBJECTS.slice(0, 8)).map((subject, index) => {
              const Icon = subject.icon;

              return (
                <motion.button
                  key={subject.key}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.18) }}
                  onClick={() => openSubject(subject)}
                  className="group min-h-[220px] rounded-[24px] border border-white/12 bg-white/[0.075] p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/[0.11] focus:outline-none focus:ring-2 focus:ring-amber-300/50"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${subject.iconClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">{subject.hausa}</h3>
                  <p lang="ar" dir="rtl" className="mt-1 text-right text-lg text-amber-200">{subject.arabic}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/35">{subject.english}</p>
                  <p className="mt-4 text-sm leading-6 text-emerald-50/55">{subject.description}</p>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-amber-300">
                    Coming soon
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllSubjects((current) => !current)}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-amber-300/35 bg-amber-300/10 px-6 font-semibold text-amber-200 backdrop-blur-xl transition hover:border-amber-300/55 hover:bg-amber-300/15"
            >
              {showAllSubjects ? "Nuna kaɗan" : "Explore more subjects"}
              <ChevronRight
                className={`h-4 w-4 transition-transform ${
                  showAllSubjects ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[30px] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
                  Jerin jira
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  Ka kasance cikin farkon masu gwadawa.
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-emerald-50/65">
                  Shigar da imel ɗinka. Za mu sanar da kai idan HausaArabia
                  Learn ya fara buɗe darussa.
                </p>
              </div>

              <form
                onSubmit={(event) => void joinWaitlist(event, null)}
                className="rounded-2xl border border-white/12 bg-black/10 p-4 backdrop-blur-xl"
              >
                <label htmlFor="learn-waitlist-email" className="mb-2 block text-sm font-medium text-amber-100">
                  Imel ɗinka
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="learn-waitlist-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setJoined(false);
                    }}
                    placeholder="you@example.com"
                    className="min-h-12 min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-base text-white outline-none placeholder:text-white/35 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/20"
                  />

                  <button
                    type="submit"
                    disabled={joining}
                    className="min-h-12 rounded-xl bg-amber-400 px-5 font-semibold text-emerald-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {joining ? "Ana sakawa..." : "Join waiting list"}
                  </button>
                </div>

                {joined && (
                  <p className="mt-3 text-sm font-medium text-emerald-200">
                    An saka ka cikin jerin jira. Za mu sanar da kai idan ya buɗe.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedSubject && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedSubject(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/15 bg-black/35 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelectedSubject(null)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${selectedSubject.iconClass}`}>
                  <SelectedIcon className="h-7 w-7" />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
                  Subject Opening Soon
                </p>

                <h2 className="mt-2 text-3xl font-bold">{selectedSubject.hausa}</h2>
                <p lang="ar" dir="rtl" className="mt-2 text-right text-2xl text-amber-100">
                  {selectedSubject.arabic}
                </p>

                <p className="mt-5 leading-7 text-emerald-50/65">
                  Ana shirya wannan darasi a HausaArabia Learn. Learning access
                  da teacher onboarding na wannan fanni suna zuwa nan ba da
                  jimawa ba.
                </p>

                <form
                  onSubmit={(event) => void joinWaitlist(event, selectedSubject)}
                  className="mt-7 rounded-2xl border border-white/12 bg-white/[0.07] p-4"
                >
                  <label
                    htmlFor={`subject-email-${selectedSubject.key}`}
                    className="mb-2 block text-sm font-medium text-amber-100"
                  >
                    A sanar da ni idan ya buɗe
                  </label>

                  <input
                    id={`subject-email-${selectedSubject.key}`}
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setJoined(false);
                    }}
                    placeholder="you@example.com"
                    className="min-h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-base text-white outline-none placeholder:text-white/35 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/20"
                  />

                  <button
                    type="submit"
                    disabled={joining}
                    className="mt-3 min-h-12 w-full rounded-xl bg-amber-400 px-5 font-semibold text-emerald-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {joining ? "Ana sakawa..." : "Join waiting list"}
                  </button>

                  {joined && (
                    <p className="mt-3 text-sm font-medium text-emerald-200">
                      An saka ka cikin jerin jira na {selectedSubject.hausa}.
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
