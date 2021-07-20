import { HttpError } from 'domain/exceptions/HttpError';
import { RacerId } from '../../RacerId';

export class RacerNotFoundException extends HttpError {
  constructor(racerId: RacerId) {
    super(
      404,
      RacerNotFoundException.name,
      `Racer not found with id: ${racerId.value}`
    );
  }
}
