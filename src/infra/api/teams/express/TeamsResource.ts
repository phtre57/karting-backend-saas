import { create } from 'superstruct';
import { Request, Response } from 'express';

import { ITeamsService } from '../../../../services/teams/TeamsService';
import { TeamAssembler } from '../assemblers/TeamAssembler';
import { TeamSchema, TeamIdSchema } from '../dtos/TeamDto';
import { NewTeam } from '../../../../domain/teams/Team';
import { serverDependencies } from '../../express/Server';
import { TeamId } from 'domain/teams/TeamId';
import { handleExpressError } from 'infra/api/express/error';

const getTeam = async (
  req: Request,
  res: Response,
  service: ITeamsService,
  assembler: TeamAssembler
) => {
  try {
    const { id } = create(req.params, TeamIdSchema);
    const teamId = new TeamId(id);
    const team = await service.getTeam(teamId);
    return res.status(200).json(assembler.toDto(team)).send();
  } catch (e) {
    return handleExpressError(e, res);
  }
};

const addTeam = async (
  req: Request,
  res: Response,
  service: ITeamsService,
  assembler: TeamAssembler
) => {
  try {
    const teamDto = create(req.body, TeamSchema);
    const team: NewTeam = assembler.newTeamFromDto(teamDto);
    const addedTeam = await service.addTeam(team);
    return res.status(201).json(assembler.toDto(addedTeam)).send();
  } catch (e) {
    return handleExpressError(e, res);
  }
};

const addTeamHandler = async (req: Request, res: Response) =>
  addTeam(
    req,
    res,
    serverDependencies.getDependencies().teamsService,
    serverDependencies.getDependencies().teamsAssembler
  );

const getTeamHandler = async (req: Request, res: Response) =>
  getTeam(
    req,
    res,
    serverDependencies.getDependencies().teamsService,
    serverDependencies.getDependencies().teamsAssembler
  );

export { addTeamHandler, getTeamHandler };
