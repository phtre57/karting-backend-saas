import { CouldNotSaveTeamException } from 'domain/teams/exceptions/exceptions/CouldNotSaveTeamException';
import { TeamNotFoundException } from 'domain/teams/exceptions/exceptions/TeamNotFoundException';
import { TeamsRepository } from 'domain/teams/repository/TeamRepository';
import { Collection } from 'mongodb';

import { Team } from 'domain/teams/Team';
import { TeamId } from 'domain/teams/TeamId';
import { MongoRepository } from '../mongoDb/MongoRepository';
import { buildTeam, toTeamEntity } from './entitites/TeamEntity';

export class MongoTeamsRepository implements TeamsRepository {
  private repo: MongoRepository;
  constructor(repo: MongoRepository) {
    this.repo = repo;
  }

  async getTeam(teamId: TeamId): Promise<Team> {
    const collection = this.getCollection();
    const result = await collection.findOne({
      id: teamId.value,
    });

    if (!result) {
      throw new TeamNotFoundException(teamId);
    }

    return buildTeam(result);
  }

  async addTeam(team: Team): Promise<Team> {
    const collection = this.getCollection();
    const result = await collection.insertOne(toTeamEntity(team));

    if (!result.acknowledged) {
      throw new CouldNotSaveTeamException(team);
    }

    return team;
  }

  async updateTeam(team: Team): Promise<Team> {
    const collection = this.getCollection();
    const result = await collection.updateOne(
      { id: team.id.value },
      { $set: toTeamEntity(team) }
    );

    if (!result.acknowledged) {
      throw new CouldNotSaveTeamException(team);
    }

    return team;
  }

  private getCollection(): Collection {
    const db = this.repo.getDatabase();
    return db.collection('teams');
  }
}
