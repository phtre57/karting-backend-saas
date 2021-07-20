import { object, string, array, optional, size } from 'superstruct';

import { uuidValidator } from 'domain/ids/Uuidv4';
import { PartialRacerSchema } from '../../racers/dtos/RacerDto';

export const TeamSchema = object({
  id: optional(uuidValidator),
  name: size(string(), 1, Infinity),
  racers: array(PartialRacerSchema),
});

export const TeamIdSchema = object({
  id: uuidValidator,
});

export type TeamDto = typeof TeamSchema.TYPE;
export type TeamIdDto = typeof TeamIdSchema.TYPE;
