import { z } from 'zod';

export const FieldLocationSchema = z.object({
  prefix: z.string(),
  city: z.string(),
  country: z.string(),
});

export type FieldLocation = z.infer<typeof FieldLocationSchema>;

export const FieldSchema = z.object({
  _id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  location: FieldLocationSchema,
});

export type Field = z.infer<typeof FieldSchema>;
