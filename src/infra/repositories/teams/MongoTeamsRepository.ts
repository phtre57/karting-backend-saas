import { Collection, MongoServerError } from 'mongodb';

import { TeamNotFoundException } from 'domain/teams/repository/exceptions/TeamNotFoundException';
import { TeamsRepository } from 'domain/teams/repository/TeamRepository';
import {
  CouldNotSaveTeamWithSameName,
  CouldNotSaveTeamWithSameId,
} from 'domain/teams/repository/exceptions';
import { Team } from 'domain/teams/Team';
import { TeamId } from 'domain/teams/TeamId';
import { MongoRepository } from '../mongoDb/MongoRepository';
import { buildTeam, toTeamEntity } from './entitites/TeamEntity';

export const DUPLICATE_KEY_ERROR_CODE = 11000;
export const NAME_INDEX = 'teams-name-index';
export const ID_INDEX = 'teams-id-index';

export const handleMongoServerError = (error: MongoServerError, team: Team) => {
  const { code, message } = error;

  if (code === DUPLICATE_KEY_ERROR_CODE) {
    if (message.includes(NAME_INDEX)) {
      throw new CouldNotSaveTeamWithSameName(team);
    } else if (message.includes(ID_INDEX)) {
      throw new CouldNotSaveTeamWithSameId(team);
    }
  }

  throw error;
};

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
    try {
      const collection = this.getCollection();
      await collection.insertOne(toTeamEntity(team));
      return team;
    } catch (e) {
      if (e instanceof MongoServerError) {
        handleMongoServerError(e, team);
      }
      throw e;
    }
  }

  async updateTeam(team: Team): Promise<Team> {
    try {
      const collection = this.getCollection();
      await collection.updateOne(
        { id: team.id.value },
        { $set: toTeamEntity(team) }
      );
      return team;
    } catch (e) {
      if (e instanceof MongoServerError) {
        handleMongoServerError(e, team);
      }
      throw e;
    }
  }

  private getCollection(): Collection {
    const db = this.repo.getDatabase();
    return db.collection('teams');
  }

  async _deleteForTests(): Promise<void> {
    const collection = this.getCollection();
    await collection.deleteMany({
      id: { $ne: '5f63bbef-d510-4d69-b291-5ff15b6ebc79' },
    });
  }
}
