import { object, string, array, optional } from 'superstruct';
import { RacerSchema } from '../../racers/dtos/RacerDto';

export const TeamSchema = object({
  id: optional(string()),
  name: string(),
  racers: array(RacerSchema),
});

export const TeamsIdSchema = object({
  id: string(),
});

export type TeamDto = typeof TeamSchema.TYPE;
export type TeamIdDto = typeof TeamsIdSchema.TYPE;
