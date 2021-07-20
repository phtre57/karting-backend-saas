import { HttpError } from 'domain/exceptions/HttpError';
import { RacerId } from '../../racers/RacerId';
import { Team } from '../Team';

export class RacerNotInTeamException extends HttpError {
  constructor(racerId: RacerId, team: Team) {
    super(
      404,
      RacerNotInTeamException.name,
      `Racer with id ${racerId.value} was not found in team ${team.name}`
    );
  }
}
