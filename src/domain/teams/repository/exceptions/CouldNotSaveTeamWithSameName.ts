import { Team } from 'domain/teams/Team';

export class CouldNotSaveTeamWithSameName extends Error {
  constructor(team: Team) {
    super(`Could not save team with same name as another one: ${team.name}`);
  }
}
