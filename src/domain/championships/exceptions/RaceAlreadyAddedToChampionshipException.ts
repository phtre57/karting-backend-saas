import { HttpError } from 'domain/exceptions/HttpError';
import { Championship } from '../Championship';
import { Race } from '../races';

export class RaceAlreadyAddedToChampionshipException extends HttpError {
  constructor(championship: Championship, race: Race) {
    super(
      400,
      RaceAlreadyAddedToChampionshipException.name,
      `Race with id: ${race.id.value} already added to championship with id: ${championship.id.value}`
    );
  }
}
