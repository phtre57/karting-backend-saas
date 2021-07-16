import { TeamNotFoundException } from 'domain/teams/exceptions/exceptions/TeamNotFoundException';
import { TeamsRepository } from 'domain/teams/repository/TeamRepository';
import { Team } from 'domain/teams/Team';
import { TeamId } from 'domain/teams/TeamId';
import { MongoRepository } from '../mongoDb/MongoRepository';

export class MongoTeamsRepository
  extends MongoRepository
  implements TeamsRepository
{
  constructor(connectionString: string, dbName: string) {
    super(connectionString, dbName);
  }

  async getTeam(teamId: TeamId): Promise<Team> {
    const db = this.getDatabase();
    const teams = db.collection('teams');
    const result = await teams.findOne({
      id: teamId.value,
    });

    if (!result) {
      throw new TeamNotFoundException(teamId);
    }

    return new Team({
      id: new TeamId(result.id),
      name: result.name,
      racers: result.racers,
    });
  }

  async addTeam(team: Team): Promise<Team> {
    throw new Error('Method not implemented.');
  }

  async updateTeam(team: Team): Promise<Team> {
    throw new Error('Method not implemented.');
  }
}
