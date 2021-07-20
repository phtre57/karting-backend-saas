import { Response } from 'express';

export const handleExpressError = (e: Error, res: Response) => {
  return res
    .status(400)
    .json({
      errorCode: e.name,
      errorMessage: e.message,
    })
    .send();
};
