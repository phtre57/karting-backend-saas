/**
 * @group medium
 */

import { RacerId } from '../../../domain/racers/RacerId';
import { ENV_KEYS, getEnvVariable } from '../../dependencies/env';
import { MongoRepository } from '../mongoDb/MongoRepository';
import { MongoRacersRepository } from './MongoRacersRepository';
import {
  CouldNotSaveRacerWithSameId,
  RacerNotFoundException,
} from '../../../domain/racers/repositories/exceptions';
import { Racer } from '../../../domain/racers/Racer';

describe('MongoRacerRepository - medium', () => {
  let repo: MongoRacersRepository;
  let client: MongoRepository;

  beforeAll(async () => {
    const connectionString = MongoRepository.formatConnectionString(
      getEnvVariable(ENV_KEYS.DBUSERNAME),
      getEnvVariable(ENV_KEYS.DBPASSWORD)
    );
    client = new MongoRepository(connectionString, 'karting-saas-test');
    await client.connect();
    repo = new MongoRacersRepository(client);
  });

  afterAll(async () => {
    await repo._deleteForTests();
    client.close();
  });

  test('Given racer exists When getting racer Then racer returns', async () => {
    const id = new RacerId('e6e88bdb-0875-4a51-aebb-83ab5c5b329a');

    const actual = await repo.getRacer(id);

    expect(actual.firstName).toBe('fel');
  });

  test('Given racer does not exist When getting racer Then racer not found exception is thrown', async () => {
    const id = RacerId.new();

    const action = async () => await repo.getRacer(id);

    await expect(action).rejects.toThrow(RacerNotFoundException);
  });

  test('When adding racer Then racer is added', async () => {
    const id = RacerId.new();
    const racer = new Racer({
      id: id,
      firstName: 'zo',
      lastName: 'bese',
    });

    await repo.addRacer(racer);
    const actual = await repo.getRacer(id);

    expect(actual).toStrictEqual(racer);
  });

  test('Given racer already added with same id When adding racer Then CouldNotSaveRacerWithSameId exception thrown', async () => {
    const id = RacerId.new();
    const racer = new Racer({
      id: id,
      firstName: 'zo',
      lastName: 'bese',
    });

    await repo.addRacer(racer);
    const action = async () => await repo.addRacer(racer);

    await expect(action).rejects.toThrow(CouldNotSaveRacerWithSameId);
  });

  test('Given racer does not exists When updating racer Then racer not found', async () => {
    const id = RacerId.new();
    const racer = new Racer({
      id: id,
      firstName: 'test',
      lastName: 'test',
    });

    const action = async () => await repo.updateRacer(racer);

    await expect(action).rejects.toThrow(RacerNotFoundException);
  });

  test('Given racer exists When updating racer Then racer is updated', async () => {
    const id = RacerId.new();
    const racer = new Racer({
      id: id,
      firstName: 'test',
      lastName: 'test',
    });
    const updatedRacer = new Racer({
      id: id,
      firstName: 'zo',
      lastName: 'test',
    });

    await repo.addRacer(racer);
    await repo.updateRacer(updatedRacer);
    const actual = await repo.getRacer(id);

    expect(actual).toStrictEqual(updatedRacer);
  });
});
