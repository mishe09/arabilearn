// data/prayers/index.ts

import type { Prayer, PrayerModuleSummary } from '@/types/prayers';
import { salah, getSalahStepBySlug } from './salah';
import { jumuah, getJumuahStepBySlug } from './jumuah';

export { salah, getSalahStepBySlug } from './salah';
export { jumuah, getJumuahStepBySlug } from './jumuah';

const prayersBySlug: Record<string, Prayer> = {
  salah,
  jumuah,
};

export function getPrayerBySlug(slug: string): Prayer | undefined {
  return prayersBySlug[slug];
}

/** Cards shown on the /dashboard/prayers landing page. */
export const prayerModuleSummaries: PrayerModuleSummary[] = [
  {
    id: 'salah',
    slug: 'salah',
    titleHausa: 'Koyon Sallah',
    titleEnglish: 'Learn Salah',
    descriptionHausa:
      'Koyi kowane mataki na sallah, daga niyya har zuwa salam, da Larabci da Hausa.',
    icon: 'salah',
    status: 'available',
    totalSteps: salah.steps.length,
  },
  {
    id: 'jumuah',
    slug: 'jumuah',
    titleHausa: "Jumu'ah",
    titleEnglish: "Jumu'ah",
    descriptionHausa:
      "Koyi ma\u2019anar Sallar Jumu\u2019a, ladubban huduba, da yadda take haɗuwa da sallar yau da kullum.",
    icon: 'jumuah',
    status: 'available',
    totalSteps: jumuah.steps.length,
  },
  {
    id: 'duas',
    slug: 'duas',
    titleHausa: "Addu\u2019o\u2019in Yau da Kullum",
    titleEnglish: 'Daily Du\u2019as',
    descriptionHausa: 'Za a kara wannan bangaren nan ba da jimawa ba.',
    icon: 'duas',
    status: 'coming_soon',
  },
];
