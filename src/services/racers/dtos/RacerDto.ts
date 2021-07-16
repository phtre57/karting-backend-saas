import { object, string, optional } from 'superstruct';

export const RacerSchema = object({
  id: optional(string()),
  firstName: optional(string()),
  lastName: optional(string()),
  fullName: optional(string()),
});

export type RacerDto = typeof RacerSchema.TYPE;
