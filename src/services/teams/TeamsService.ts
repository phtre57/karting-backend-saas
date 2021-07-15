import { TeamsRepository } from '../../domain/teams/repository/TeamRepository';
import { Team } from '../../domain/teams/Team';
import { TeamId } from '../../domain/teams/TeamId';

export interface ITeamsService {
  getTeam(teamId: TeamId): Team;
  addTeam(team: Team): Team;
}

export class TeamsService implements ITeamsService {
  repository: TeamsRepository;

  constructor(repository: TeamsRepository) {
    this.repository = repository;
  }

  getTeam(teamId: TeamId): Team {
    return this.repository.getTeam(teamId);
  }

  addTeam(team: Team): Team {
    return this.repository.addOrUpdateTeam(team);
  }
}
