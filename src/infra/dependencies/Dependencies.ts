import { RacersRepository } from 'domain/racers/repositories/RacersRepository';
import { RacerAssembler } from 'infra/api/racers/assemblers/RacerAssembler';
import { IRacersService } from 'services/racers/RacersService';
import { TeamsRepository } from '../../domain/teams/repository/TeamRepository';
import { ITeamsService } from '../../services/teams/TeamsService';
import { TeamAssembler } from '../api/teams/assemblers/TeamAssembler';

export interface Dependencies {
  racerService: IRacersService;
  racersRepository: RacersRepository;
  racerAssembler: RacerAssembler;
  teamsRepository: TeamsRepository;
  teamsService: ITeamsService;
  teamsAssembler: TeamAssembler;
}
