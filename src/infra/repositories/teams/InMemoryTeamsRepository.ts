import { TeamNotFoundException } from '../../../domain/teams/exceptions/exceptions/TeamNotFoundException';
import { TeamsRepository } from '../../../domain/teams/repository/TeamRepository';
import { Team } from '../../../domain/teams/Team';
import { TeamId } from '../../../domain/teams/TeamId';

// TODO: Test me?
export class InMemoryTeamsRepository implements TeamsRepository {
  teams: Record<string, Team>;

  constructor(teams: Record<string, Team>) {
    this.teams = teams;
  }

  getTeam(teamId: TeamId): Team {
    if (!this.teams[teamId.value]) {
      throw new TeamNotFoundException(teamId);
    }

    return this.teams[teamId.value];
  }

  addOrUpdateTeam(team: Team): Team {
    const { id } = team;
    if (!this.teams[id.value]) {
      throw new TeamNotFoundException(id);
    }
    this.teams[id.value] = team;

    return this.teams[id.value];
  }
}
