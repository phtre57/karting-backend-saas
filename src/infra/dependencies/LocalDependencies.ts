import { RacersRepository } from 'domain/racers/repositories/RacersRepository';
import { TeamsRepository } from 'domain/teams/repository/TeamRepository';
import { MongoRepository } from 'infra/repositories/mongoDb/MongoRepository';
import { MongoTeamsRepository } from 'infra/repositories/teams/MongoTeamsRepository';
import { RacerFactory } from '../../domain/racers/factories/RacerFactory';
import { TeamFactory } from '../../domain/teams/factories/TeamFactory';
import { TeamsService } from '../../services/teams/TeamsService';
import { RacerAssembler } from '../api/racers/assemblers/RacerAssembler';
import { TeamAssembler } from '../api/teams/assemblers/TeamAssembler';
import { InMemoryRacersRepository } from '../repositories/racers/InMemoryRacersRepository';
import { Dependencies } from './Dependencies';
import { ENV_KEYS, getEnvVariable } from './env';

export interface DependencyContainer {
  getDependencies(): Dependencies;
  kill(): void;
}

// TODO: handle all env in future
export class LocalDependencyContainer implements DependencyContainer {
  private racerAssembler: RacerAssembler;
  private racerFactory: RacerFactory;
  private racersRepository: RacersRepository;

  private mongoRepository: MongoRepository;

  private teamsRepository: TeamsRepository;
  private teamFactory: TeamFactory;
  private teamsService: TeamsService;
  private teamsAssembler: TeamAssembler;

  // TODO: Order is important we should have some null checking
  constructor() {
    const connectionString = MongoRepository.formatConnectionString(
      getEnvVariable(ENV_KEYS.DBUSERNAME),
      getEnvVariable(ENV_KEYS.DBPASSWORD)
    );
    this.mongoRepository = new MongoRepository(
      connectionString,
      getEnvVariable(ENV_KEYS.DBNAME)
    );
    this.initRacersContext();
    this.initTeamsContext();
  }

  private initRacersContext() {
    this.racerAssembler = new RacerAssembler();
    this.racerFactory = new RacerFactory();
    this.racersRepository = new InMemoryRacersRepository({});
  }

  private initTeamsContext() {
    this.teamsRepository = new MongoTeamsRepository(this.mongoRepository);
    this.teamFactory = new TeamFactory(
      this.racerFactory,
      this.racersRepository
    );
    this.teamsService = new TeamsService(
      this.teamsRepository,
      this.teamFactory
    );
    this.teamsAssembler = new TeamAssembler(this.racerAssembler);
  }

  getDependencies(): Dependencies {
    return {
      teamsRepository: this.teamsRepository,
      teamsService: this.teamsService,
      teamsAssembler: this.teamsAssembler,
    };
  }

  async start(): Promise<void> {
    await this.mongoRepository.connect();
  }

  kill(): void {
    this.mongoRepository.close();
  }
}
