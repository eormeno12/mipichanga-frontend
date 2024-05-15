import { z } from "zod";
import { FieldLocationSchema, FieldSchema } from "../fields/fields.model";


export const UserMatchSchema = z.object({
  _id: z.string(),
  name: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  field: FieldSchema,
});

export type UserMatch = z.infer<typeof UserMatchSchema>;

export const UserSchema = z.object({
  _id: z.string(),
  email: z.string(),
  matches: z.array(UserMatchSchema),
})

export type User = z.infer<typeof UserSchema>;
