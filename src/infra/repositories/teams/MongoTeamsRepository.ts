import { TeamNotFoundException } from 'domain/teams/exceptions/exceptions/TeamNotFoundException';
import { TeamsRepository } from 'domain/teams/repository/TeamRepository';
import { Team } from 'domain/teams/Team';
import { TeamId } from 'domain/teams/TeamId';
import { MongoRepository } from '../mongoDb/MongoRepository';
import { buildTeam } from './entitites/TeamEntity';

export class MongoTeamsRepository implements TeamsRepository {
  private repo: MongoRepository;
  constructor(repo: MongoRepository) {
    this.repo = repo;
  }

  async getTeam(teamId: TeamId): Promise<Team> {
    const db = this.repo.getDatabase();
    const teams = db.collection('teams');
    const result = await teams.findOne({
      id: teamId.value,
    });

    if (!result) {
      throw new TeamNotFoundException(teamId);
    }

    return buildTeam(result);
  }

  async addTeam(team: Team): Promise<Team> {
    throw new Error('Method not implemented.');
  }

  async updateTeam(team: Team): Promise<Team> {
    throw new Error('Method not implemented.');
  }
}
