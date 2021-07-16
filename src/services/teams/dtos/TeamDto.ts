import { object, string, array, optional } from 'superstruct';
import { RacerSchema } from '../../racers/dtos/RacerDto';

export const TeamSchema = object({
  id: optional(string()),
  name: string(),
  racers: array(RacerSchema),
});

export type TeamDto = typeof TeamSchema.TYPE;
