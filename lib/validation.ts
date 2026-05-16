import { z } from 'zod';

const localizedSchema = z.object({
  az: z.string().default(''),
  ru: z.string().default(''),
  en: z.string().default(''),
});

const imageSchema = z.object({
  url: z.string().url(),
  publicId: z.string().min(1),
  width: z.number().int().nonnegative().default(0),
  height: z.number().int().nonnegative().default(0),
  alt: z.string().default(''),
});

export const projectInputSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'slug yalnız kiçik hərflər, rəqəm və tire ola bilər'),
  title: localizedSchema.refine((v) => v.az.trim().length > 0, {
    message: 'Azərbaycan dilində başlıq tələb olunur',
    path: ['az'],
  }),
  titleItalic: localizedSchema.optional(),
  description: localizedSchema.optional(),
  category: z.enum(['villa', 'apartment', 'restaurant', 'office', 'commercial', 'other']),
  status: z.enum(['completed', 'in_progress', 'planned']),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  location: z.string().default(''),
  size: z.string().default(''),
  duration: z.string().default(''),
  year: z.string().default(''),
  coverImage: imageSchema.nullable().optional(),
  gallery: z.array(imageSchema).default([]),
  order: z.number().int().default(0),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;
