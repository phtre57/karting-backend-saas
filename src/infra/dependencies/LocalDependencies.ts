import { TeamsService } from '../../services/teams/TeamsService';
import { TeamAssembler } from '../api/express/teams/assemblers/TeamAssembler';
import { InMemoryTeamsRepository } from '../repositories/teams/InMemoryTeamsRepository';
import { Dependencies } from './Dependencies';

const teamsRepository = new InMemoryTeamsRepository({});
const teamsService = new TeamsService(teamsRepository);
const teamsAssembler = new TeamAssembler();

export const localDependencies: Dependencies = {
  teamsRepository: teamsRepository,
  teamsService: teamsService,
  teamsAssembler: teamsAssembler,
};
