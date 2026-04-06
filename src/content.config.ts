import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sermons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sermons' }),
  schema: z.object({
    title: z.string(),
    speaker: z.string(),
    date: z.coerce.string(),
    series: z.string().optional().transform(v => v || undefined),
    scripture: z.string().optional().transform(v => v || undefined),
    audioUrl: z.string().optional().transform(v => v || undefined),
    videoUrl: z.string().optional().transform(v => v || undefined),
    description: z.string().optional().transform(v => v || undefined),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.string(),
    endDate: z.string().optional().transform(v => v || undefined),
    time: z.string().optional().transform(v => v || undefined),
    location: z.string().optional().transform(v => v || undefined),
    description: z.string().optional().transform(v => v || undefined),
    image: z.string().optional().transform(v => v || undefined),
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
    description: z.string().optional().transform(v => v || undefined),
    openToNewMembers: z.boolean().default(true),
    type: z.enum(['bible-study', 'fellowship', 'prayer', 'topical']).optional(),
  }),
});

export const collections = { sermons, events, 'small-groups': smallGroups };
