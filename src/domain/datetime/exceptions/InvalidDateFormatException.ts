import { HttpError } from 'domain/exceptions/HttpError';

export class InvalidDateFormatException extends HttpError {
  constructor(date: string, format: string) {
    super(
      400,
      InvalidDateFormatException.name,
      `Invalid date format (${format}) used for date (${date})`
    );
  }
}
