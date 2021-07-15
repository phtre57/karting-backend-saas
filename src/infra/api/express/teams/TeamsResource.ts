import { Request, Response } from 'express';

import { TeamsService } from '../../../../services/teams/TeamsService';
import { localDependencies } from '../../../dependencies/LocalDependencies';
import { TeamAssembler } from './assemblers/TeamAssembler';

const addTeam = (req: Request, res: Response, service: TeamsService, assembler: TeamAssembler) => {
  try {
    const team = assembler.fromDto(req.body);
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

// TODO: use dependency betterly
const addTeamHandler = (req: Request, res: Response) =>
  addTeam(req, res, localDependencies.teamsService, localDependencies.teamsAssembler);

export { addTeamHandler };
