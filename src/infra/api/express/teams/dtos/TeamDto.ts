import { object, string, array } from 'superstruct';
import { RacerSchema } from '../../racers/dtos/RacerDto';

export const TeamSchema = object({
  name: string(),
  racers: array(RacerSchema),
});

export interface TeamDto {
  id: string;
  name: string;
  racers: Array<>;
}
