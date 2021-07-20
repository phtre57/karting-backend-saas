import { Racer } from '../../Racer';

export class CouldNotSaveRacerWithSameId extends Error {
  constructor(racer: Racer) {
    super(`Cannot save racer with same id as another one: ${racer.id.value}`);
  }
}
