import { object, string, array, optional } from 'superstruct';

import { uuidValidator } from 'domain/ids/Uuidv4';
import { PartialRacerSchema } from '../../racers/dtos/RacerDto';

export const TeamSchema = object({
  id: optional(uuidValidator),
  name: string(),
  racers: array(PartialRacerSchema),
});

export const TeamsIdSchema = object({
  id: string(),
});

export type TeamDto = typeof TeamSchema.TYPE;
export type TeamIdDto = typeof TeamsIdSchema.TYPE;
