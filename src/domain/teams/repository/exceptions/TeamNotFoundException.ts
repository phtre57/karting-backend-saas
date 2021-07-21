import { HttpError } from 'domain/exceptions/HttpError';
import { TeamId } from '../../TeamId';

export class TeamNotFoundException extends HttpError {
  constructor(teamId: TeamId) {
    super(
      404,
      TeamNotFoundException.name,
      `Team not found with id: ${teamId.value}`
    );
  }
}
