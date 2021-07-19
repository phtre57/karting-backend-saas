import { MongoRepository } from '../mongoDb/MongoRepository';
import { getEnvVariable, ENV_KEYS } from '../../dependencies/env';
import { MongoTeamsRepository } from '../teams/MongoTeamsRepository';
import { TeamId } from '../../../domain/teams/TeamId';
import { Team } from '../../../domain/teams/Team';

describe('MongoTeamsRepository - Medium', () => {
  let repo: MongoTeamsRepository;
  let client: MongoRepository;
  beforeAll(async () => {
    const connectionString = MongoRepository.formatConnectionString(
      getEnvVariable(ENV_KEYS.DBUSERNAME),
      getEnvVariable(ENV_KEYS.DBPASSWORD)
    );
    client = new MongoRepository(connectionString, 'karting-saas-test');
    await client.connect();
    repo = new MongoTeamsRepository(client);
  });

  afterAll(() => {
    client.close();
  });

  test('When getting team Then team is returned', async () => {
    const id = new TeamId('5f63bbef-d510-4d69-b291-5ff15b6ebc79');
    const racer = await repo.getTeam(id);

    expect(racer.name).toStrictEqual('patate team');
  });

  test('When adding a team Then team is added to repo', async () => {
    const id = TeamId.new();
    const name = 'team des iooo';
    const team = new Team({
      id: id,
      name: 'team des iooo',
      racers: {},
    });

    await repo.addTeam(team);
    const actualTeam = await repo.getTeam(id);

    expect(actualTeam.name).toBe(name);
  });

  test('When updating a team Then team is updated in repo', async () => {
    const id = TeamId.new();
    const name = 'team des iooo';
    const newName = 'teams de zo';
    const team = new Team({
      id: id,
      name: name,
      racers: {},
    });
    const newTeam = new Team({
      id: id,
      name: newName,
      racers: {},
    });

    await repo.addTeam(team);
    await repo.updateTeam(newTeam);
    const actualTeam = await repo.getTeam(id);

    expect(actualTeam.name).toBe(newName);
  });
});
