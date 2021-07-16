import { object, string, optional } from 'superstruct';

export const RacerSchema = object({
  id: optional(string()),
  firstName: string(),
  lastName: string(),
  fullName: optional(string()),
});

export type RacerDto = typeof RacerSchema.TYPE;
