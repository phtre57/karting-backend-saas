import { TeamsRepository } from '../../domain/teams/repository/TeamRepository';
import { Team } from '../../domain/teams/Team';

export interface ITeamsService {
  addTeam(team: Team): Team;
}

export class TeamsService implements ITeamsService {
  repository: TeamsRepository;

  constructor(repository: TeamsRepository) {
    this.repository = repository;
  }

  addTeam(team: Team): Team {
    return this.repository.addOrUpdateTeam(team);
  }
}
