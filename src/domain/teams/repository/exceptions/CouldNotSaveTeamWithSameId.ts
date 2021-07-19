import { Team } from 'domain/teams/Team';

export class CouldNotSaveTeamWithSameId extends Error {
  constructor(team: Team) {
    super(`Could not save team with same id as another one: ${team.id.value}`);
  }
}
