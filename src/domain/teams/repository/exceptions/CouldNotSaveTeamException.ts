import { Team } from 'domain/teams/Team';
import { HttpError } from 'domain/exceptions/HttpError';

export class CouldNotSaveTeamException extends HttpError {
  constructor(team: Team) {
    super(
      400,
      CouldNotSaveTeamException.name,
      `Could not save team with id: ${team.id.value}`
    );
  }
}
