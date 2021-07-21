import { HttpError } from 'domain/exceptions/HttpError';
import { Championship } from '../Championship';
import { RaceId } from '../races';

export class RaceNotFoundInChampionshipException extends HttpError {
  constructor(championship: Championship, raceId: RaceId) {
    super(
      404,
      RaceNotFoundInChampionshipException.name,
      `Race with id: ${raceId.value} not found in championship with id: ${championship.id.value}`
    );
  }
}
