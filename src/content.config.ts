import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sermons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sermons' }),
  schema: z.object({
    title: z.string(),
    speaker: z.string(),
    date: z.string(),
    series: z.string().optional(),
    scripture: z.string().optional(),
    audioUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    description: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    endDate: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

const smallGroups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/small-groups' }),
  schema: z.object({
    title: z.string(),
    leader: z.string(),
    day: z.string(),
    time: z.string(),
    location: z.string(),
    description: z.string().optional(),
    openToNewMembers: z.boolean().default(true),
    type: z.enum(['bible-study', 'fellowship', 'prayer', 'topical']).optional(),
  }),
});

export const collections = { sermons, events, 'small-groups': smallGroups };
