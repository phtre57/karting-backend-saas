import { object, string } from 'superstruct';

export const RacerSchema = object({
  firstName: string(),
  lastName: string(),
});

export interface RacerDto {
  id: string;
  firstName: string;
  lastName: string;
}
