import { HttpError } from 'domain/exceptions/HttpError';
import { Racer } from '../../Racer';

export class CouldNotSaveRacerWithSameId extends HttpError {
  constructor(racer: Racer) {
    super(
      400,
      CouldNotSaveRacerWithSameId.name,
      `Cannot save racer with same id as another one: ${racer.id.value}`
    );
  }
}
