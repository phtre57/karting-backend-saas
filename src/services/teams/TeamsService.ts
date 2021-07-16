import { TeamFactory } from '../../domain/teams/factories/TeamFactory';
import { TeamsRepository } from '../../domain/teams/repository/TeamRepository';
import { NewTeam, Team } from '../../domain/teams/Team';
import { TeamId } from '../../domain/teams/TeamId';

export interface ITeamsService {
  getTeam(teamId: TeamId): Team;
  addTeam(newTeam: NewTeam): Team;
}

export class TeamsService implements ITeamsService {
  teamsRepository: TeamsRepository;
  teamFactory: TeamFactory;

  constructor(teamsRepository: TeamsRepository, teamFactory: TeamFactory) {
    this.teamsRepository = teamsRepository;
    this.teamFactory = teamFactory;
  }

  getTeam(teamId: TeamId): Team {
    return this.teamsRepository.getTeam(teamId);
  }

  addTeam(newTeam: NewTeam): Team {
    const team = this.teamFactory.newTeam(newTeam);
    return this.teamsRepository.addOrUpdateTeam(team);
  }
}
