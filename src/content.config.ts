import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const opt = z.union([z.string(), z.date().transform(d => d.toISOString().split('T')[0])]).optional().transform(v => v || undefined);

const cardSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

const sermons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sermons' }),
  schema: z.object({
    title: z.string(),
    speaker: z.string(),
    date: z.coerce.string(),
    series: opt,
    scripture: opt,
    audioUrl: opt,
    videoUrl: opt,
    description: opt,
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    endDate: opt,
    time: opt,
    location: opt,
    description: opt,
    image: opt,
    featured: z.boolean().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    // Home
    heroTitle: opt,
    heroSubtitle: opt,
    welcomeHeading: opt,
    welcomeText: opt,
    scriptureQuote: opt,
    scriptureRef: opt,
    // About
    mission: opt,
    vision: opt,
    cccvaspText: opt,
    // Contact
    location: opt,
    address: opt,
    email: opt,
    mapEmbedUrl: opt,
    // Youth
    parentCtaText: opt,
    // Shared list fields
    cards: z.array(cardSchema).optional(),
    values: z.array(cardSchema).optional(),
    team: z.array(z.object({
      name: z.string(),
      role: z.string(),
      bio: z.string(),
      photo: opt,
    })).optional(),
    serviceTimes: z.array(z.object({
      label: z.string(),
      time: z.string(),
    })).optional(),
    programs: z.array(cardSchema).optional(),
    volunteerOpps: z.array(cardSchema).optional(),
  }).passthrough(),
});

export const collections = { sermons, events, pages };
