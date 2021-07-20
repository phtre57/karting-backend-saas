import { Collection, MongoServerError } from 'mongodb';

import { Racer } from 'domain/racers/Racer';
import { RacerId } from 'domain/racers/RacerId';
import { RacersRepository } from 'domain/racers/repositories/RacersRepository';
import {
  DUPLICATE_KEY_ERROR_CODE,
  MongoRepository,
} from '../mongoDb/MongoRepository';
import {
  RacerNotFoundException,
  CouldNotSaveRacerWithSameId,
} from 'domain/racers/repositories/exceptions';
import { buildRacer, toRacerEntity } from './entities/RacerEntity';

export const ID_INDEX = 'racers-id-index';

export const handleMongoServerError = (
  error: MongoServerError,
  racer: Racer
) => {
  const { code, message } = error;

  if (code === DUPLICATE_KEY_ERROR_CODE) {
    if (message.includes(ID_INDEX)) {
      throw new CouldNotSaveRacerWithSameId(racer);
    }
  }

  throw error;
};

export class MongoRacersRepository implements RacersRepository {
  private repo: MongoRepository;

  constructor(repo: MongoRepository) {
    this.repo = repo;
  }

  async getRacer(racerId: RacerId): Promise<Racer> {
    const collection = this.getCollection();
    const result = await collection.findOne({
      id: racerId.value,
    });

    if (!result) {
      throw new RacerNotFoundException(racerId);
    }

    return buildRacer(result);
  }

  async addRacer(racer: Racer): Promise<Racer> {
    try {
      const collection = this.getCollection();
      await collection.insertOne(toRacerEntity(racer));
    } catch (e) {
      if (e instanceof MongoServerError) {
        handleMongoServerError(e, racer);
      }
      throw e;
    }
    return racer;
  }

  async updateRacer(racer: Racer): Promise<Racer> {
    try {
      const collection = this.getCollection();
      const result = await collection.updateOne(
        { id: racer.id.value },
        { $set: toRacerEntity(racer) }
      );

      if (result.matchedCount === 0) {
        throw new RacerNotFoundException(racer.id);
      }
    } catch (e) {
      if (e instanceof MongoServerError) {
        handleMongoServerError(e, racer);
      }
      throw e;
    }
    return racer;
  }

  private getCollection(): Collection {
    const db = this.repo.getDatabase();
    return db.collection('racers');
  }

  async _deleteForTests(): Promise<void> {
    const collection = this.getCollection();
    await collection.deleteMany({
      id: { $ne: 'e6e88bdb-0875-4a51-aebb-83ab5c5b329a' },
    });
  }
}
