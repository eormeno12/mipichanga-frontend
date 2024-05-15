import { z } from "zod";
import { FieldSchema } from "../fields/fields.model";

export const PlayerSchema = z.object({
  _id: z.string(),
  name: z.string(),
  pos: z.number(),
});

export const TeamSchema = z.object({
  name: z.string(),
  lineup: z.string(),
  players: z.optional(z.array(PlayerSchema)),
});

export type Team = z.infer<typeof TeamSchema>;

export const CreateMatchSchema = z.object({
  name: z.string(),
  date: z.coerce.date(),
  field: FieldSchema,
  home: TeamSchema,
  away: TeamSchema,
});

export type CreateMatch = z.infer<typeof CreateMatchSchema>;

export const MatchSchema = z.object({
  _id: z.string(),
  createdAt: z.coerce.date(),
  name: z.string(),
  date: z.coerce.date(),
  field: FieldSchema,
  home: TeamSchema,
  away: TeamSchema,
});

export type Match = z.infer<typeof MatchSchema>;