import { object, string, partial } from 'superstruct';

import { uuidValidator } from 'domain/ids/Uuidv4';

export const RacerSchema = object({
  id: uuidValidator,
  firstName: string(),
  lastName: string(),
  fullName: string(),
});

export const PartialRacerSchema = partial(RacerSchema);

export type RacerDto = typeof RacerSchema.TYPE;
export type PartialRacerDto = typeof PartialRacerSchema.TYPE;
