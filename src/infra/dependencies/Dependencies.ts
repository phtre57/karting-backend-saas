import { TeamsRepository } from '../../domain/teams/repository/TeamRepository';
import { TeamsService } from '../../services/teams/TeamsService';
import { TeamAssembler } from '../api/express/teams/assemblers/TeamAssembler';

export interface Dependencies {
  teamsRepository: TeamsRepository;
  teamsService: TeamsService;
  teamsAssembler: TeamAssembler;
}
