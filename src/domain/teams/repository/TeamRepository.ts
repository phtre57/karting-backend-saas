import { Team } from '../Team';
import { TeamId } from '../TeamId';

export interface TeamsRepository {
  getTeam(teamId: TeamId): Team;
  addOrUpdateTeam(team: Team): Team;
}
