import { RacerId } from 'domain/racers/RacerId';
import { Request, Response } from 'express';
import { handleExpressError } from 'infra/api/express/error';
import { serverDependencies } from 'infra/api/express/Server';
import { IRacersService } from 'services/racers/RacersService';
import { create } from 'superstruct';
import { RacerAssembler } from '../assemblers/RacerAssembler';
import { RacerIdSchema } from '../dtos/RacerDto';

const getRacer = async (
  req: Request,
  res: Response,
  service: IRacersService,
  assembler: RacerAssembler
) => {
  try {
    const { id } = create(req.params, RacerIdSchema);
    const racer = await service.getRacer(new RacerId(id));
    return res.status(200).json(assembler.toDto(racer)).send();
  } catch (e) {
    handleExpressError(e, res);
  }
};

const getRacerHandler = async (req: Request, res: Response) =>
  getRacer(
    req,
    res,
    serverDependencies.getDependencies().racerService,
    serverDependencies.getDependencies().racerAssembler
  );

export { getRacerHandler };
