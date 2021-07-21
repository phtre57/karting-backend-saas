import { Response } from 'express';
import { HttpError } from 'domain/exceptions/HttpError';

export const handleExpressError = (e: Error, res: Response) => {
  if (e instanceof HttpError) {
    return res
      .status(e.code)
      .json({
        errorCode: e.name,
        errorMessage: e.message,
      })
      .send();
  }
  console.log(e);
  return res
    .status(500)
    .json({
      errorCode: 'InternalServerError',
      errorMessage: 'Internal server error',
    })
    .send();
};
