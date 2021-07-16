import { Team } from '../Team';
import { TeamId } from '../TeamId';

export interface TeamsRepository {
  getTeam(teamId: TeamId): Team;
  addTeam(team: Team): Team;
  updateTeam(team: Team): Team;
}
