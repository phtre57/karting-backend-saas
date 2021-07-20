import { TeamId } from '../../TeamId';

export class TeamNotFoundException extends Error {
  constructor(teamId: TeamId) {
    super(`Team not found with id: ${teamId.value}`);
  }
}
