import { create } from 'superstruct';
import { Request, Response } from 'express';

import { TeamsService } from '../../../../services/teams/TeamsService';
import { TeamAssembler } from './assemblers/TeamAssembler';
import { TeamSchema, TeamsIdSchema } from './dtos/TeamDto';
import { NewTeam } from '../../../../domain/teams/Team';
import { serverDependencies } from '../Server';
import { TeamId } from 'domain/teams/TeamId';

// TODO: put this in its own file
const handleError = (e: Error, res: Response) => {
  return res
    .status(400)
    .json({
      errorCode: e.name,
      errorMessage: e.message,
    })
    .send();
};

const getTeam = async (
  req: Request,
  res: Response,
  service: TeamsService,
  assembler: TeamAssembler
) => {
  try {
    const { id } = create(req.params, TeamsIdSchema);
    const teamId = new TeamId(id);
    const team = await service.getTeam(teamId);
    return res.status(200).json(assembler.toDto(team)).send();
  } catch (e) {
    return handleError(e, res);
  }
};

const addTeam = async (
  req: Request,
  res: Response,
  service: TeamsService,
  assembler: TeamAssembler
) => {
  try {
    const teamDto = create(req.body, TeamSchema);
    const team: NewTeam = assembler.newTeamFromDto(teamDto);
    const addedTeam = await service.addTeam(team);
    return res.status(201).json(assembler.toDto(addedTeam)).send();
  } catch (e) {
    return handleError(e, res);
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
