import { RacersRepository } from 'domain/racers/repositories/RacersRepository';
import { TeamsRepository } from 'domain/teams/repository/TeamRepository';
import { MongoRepository } from 'infra/repositories/mongoDb/MongoRepository';
import { MongoRacersRepository } from 'infra/repositories/racers/MongoRacersRepository';
import { MongoTeamsRepository } from 'infra/repositories/teams/MongoTeamsRepository';
import { IRacersService, RacersService } from 'services/racers/RacersService';
import { RacerFactory } from '../../domain/racers/factories/RacerFactory';
import { TeamFactory } from '../../domain/teams/factories/TeamFactory';
import { ITeamsService, TeamsService } from '../../services/teams/TeamsService';
import { RacerAssembler } from '../api/racers/assemblers/RacerAssembler';
import { TeamAssembler } from '../api/teams/assemblers/TeamAssembler';
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
  private racerService: IRacersService;

  private mongoRepository: MongoRepository;

  private teamsRepository: TeamsRepository;
  private teamFactory: TeamFactory;
  private teamsService: ITeamsService;
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
    this.racersRepository = new MongoRacersRepository(this.mongoRepository);
    this.racerService = new RacersService(this.racersRepository);
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
      racerAssembler: this.racerAssembler,
      racersRepository: this.racersRepository,
      racerService: this.racerService,
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
