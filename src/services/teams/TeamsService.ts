import { TeamFactory } from '../../domain/teams/factories/TeamFactory';
import { TeamsRepository } from '../../domain/teams/repository/TeamRepository';
import { NewTeam, Team } from '../../domain/teams/Team';
import { TeamId } from '../../domain/teams/TeamId';

export interface ITeamsService {
  getTeam(teamId: TeamId): Promise<Team>;
  addTeam(newTeam: NewTeam): Promise<Team>;
}

export class TeamsService implements ITeamsService {
  teamsRepository: TeamsRepository;
  teamFactory: TeamFactory;

  constructor(teamsRepository: TeamsRepository, teamFactory: TeamFactory) {
    this.teamsRepository = teamsRepository;
    this.teamFactory = teamFactory;
  }

  async getTeam(teamId: TeamId): Promise<Team> {
    return this.teamsRepository.getTeam(teamId);
  }

  async addTeam(newTeam: NewTeam): Promise<Team> {
    const team = await this.teamFactory.newTeam(newTeam);
    return this.teamsRepository.addTeam(team);
  }
}
