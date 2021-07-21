import { HttpError } from 'domain/exceptions/HttpError';
import { Team } from 'domain/teams/Team';

export class CouldNotSaveTeamWithSameId extends HttpError {
  constructor(team: Team) {
    super(
      400,
      CouldNotSaveTeamWithSameId.name,
      `Could not save team with same id as another one: ${team.id.value}`
    );
  }
}
