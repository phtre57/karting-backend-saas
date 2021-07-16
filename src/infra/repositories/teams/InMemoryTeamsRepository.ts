import { TeamNotFoundException } from '../../../domain/teams/exceptions/exceptions/TeamNotFoundException';
import { TeamsRepository } from '../../../domain/teams/repository/TeamRepository';
import { Team } from '../../../domain/teams/Team';
import { TeamId } from '../../../domain/teams/TeamId';

export class InMemoryTeamsRepository implements TeamsRepository {
  teams: Record<string, Team>;

  constructor(teams: Record<string, Team>) {
    this.teams = teams;
  }

  async getTeam(teamId: TeamId): Promise<Team> {
    if (!this.teams[teamId.value]) {
      throw new TeamNotFoundException(teamId);
    }

    return this.teams[teamId.value];
  }

  async addTeam(team: Team): Promise<Team> {
    const { id } = team;
    this.teams[id.value] = team;

    return this.teams[id.value];
  }

  async updateTeam(team: Team): Promise<Team> {
    const { id } = team;
    if (!this.teams[id.value]) {
      throw new TeamNotFoundException(id);
    }

    return this.addTeam(team);
  }
}
