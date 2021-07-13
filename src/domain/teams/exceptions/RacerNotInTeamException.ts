import { RacerId } from '../../racers/RacerId';
import { Team } from '../Team';

export class RacerNotInTeamException extends Error {
  constructor(racerId: RacerId, team: Team) {
    super(`Racer with id ${racerId.value} was not found in team ${team.name}`);
  }
}
