import { RacerFactory } from '../../domain/racers/factories/RacerFactory';
import { TeamFactory } from '../../domain/teams/factories/TeamFactory';
import { TeamsService } from '../../services/teams/TeamsService';
import { RacerAssembler } from '../api/express/racers/assemblers/RacerAssembler';
import { TeamAssembler } from '../api/express/teams/assemblers/TeamAssembler';
import { InMemoryRacersRepository } from '../repositories/racers/InMemoryRacersRepository';
import { InMemoryTeamsRepository } from '../repositories/teams/InMemoryTeamsRepository';
import { Dependencies } from './Dependencies';

// TODO: use service context?
const racerAssembler = new RacerAssembler();
const racerFactory = new RacerFactory();
const racersRepository = new InMemoryRacersRepository({});

const teamsRepository = new InMemoryTeamsRepository({});
const teamFactory = new TeamFactory(racerFactory, racersRepository);
const teamsService = new TeamsService(teamsRepository, teamFactory);
const teamsAssembler = new TeamAssembler(racerAssembler);

export const localDependencies: Dependencies = {
  teamsRepository: teamsRepository,
  teamsService: teamsService,
  teamsAssembler: teamsAssembler,
};
