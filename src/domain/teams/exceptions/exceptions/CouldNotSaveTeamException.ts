import { Team } from 'domain/teams/Team';

export class CouldNotSaveTeamException extends Error {
  constructor(team: Team) {
    super(`Could not save team with id: ${team.id.value}`);
  }
}
