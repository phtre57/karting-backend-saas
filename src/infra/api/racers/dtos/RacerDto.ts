import { object, string, partial, size } from 'superstruct';

import { uuidValidator } from 'domain/ids/Uuidv4';

export const RacerSchema = object({
  id: uuidValidator,
  firstName: size(string(), 1, Infinity),
  lastName: size(string(), 1, Infinity),
  fullName: size(string(), 1, Infinity),
});

export const PartialRacerSchema = partial(RacerSchema);

export const RacerIdSchema = object({
  id: uuidValidator,
});

export type RacerDto = typeof RacerSchema.TYPE;
export type PartialRacerDto = typeof PartialRacerSchema.TYPE;
export type RacerIdDto = typeof RacerIdSchema.TYPE;
