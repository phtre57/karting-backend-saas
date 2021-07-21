import { HttpError } from 'domain/exceptions/HttpError';
import { Team } from 'domain/teams/Team';

export class CouldNotSaveTeamWithSameName extends HttpError {
  constructor(team: Team) {
    super(
      400,
      CouldNotSaveTeamWithSameName.name,
      `Could not save team with same name as another one: ${team.name}`
    );
  }
}
