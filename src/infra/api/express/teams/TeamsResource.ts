import { create } from 'superstruct';
import { Request, Response } from 'express';

import { TeamsService } from '../../../../services/teams/TeamsService';
import { localDependencies } from '../../../dependencies/LocalDependencies';
import { TeamAssembler } from './assemblers/TeamAssembler';
import { TeamSchema } from '../../../../services/teams/dtos/TeamDto';
import { NewTeam } from '../../../../domain/teams/Team';

const addTeam = (
  req: Request,
  res: Response,
  service: TeamsService,
  assembler: TeamAssembler
) => {
  try {
    const teamDto = create(req.body, TeamSchema);
    const team: NewTeam = {
      name: teamDto.name,
      racers: teamDto.racers,
    };
    const addedTeam = service.addTeam(team);
    return res.status(201).json(assembler.toDto(addedTeam)).send();
  } catch (e) {
    return res
      .status(400)
      .json({
        errorCode: e.name,
        errorMessage: e.message,
      })
      .send();
  }
};

// TODO: use dependency better
const addTeamHandler = (req: Request, res: Response) =>
  addTeam(
    req,
    res,
    localDependencies.teamsService,
    localDependencies.teamsAssembler
  );

export { addTeamHandler };
