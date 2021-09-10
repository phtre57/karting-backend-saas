import { HttpError } from 'domain/exceptions/HttpError';
import { Championship } from '../Championship';
import { Race } from '../races';

export class RaceAlreadyAddedToChampionshipWithSameDateTimeException extends HttpError {
  constructor(championship: Championship, race: Race) {
    super(
      400,
      RaceAlreadyAddedToChampionshipWithSameDateTimeException.name,
      `Race with timestamp: ${race.at.timestamp()} already added to championship with id: ${
        championship.id.value
      }`
    );
  }
}
