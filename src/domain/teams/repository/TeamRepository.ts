import { Team } from '../Team';
import { TeamId } from '../TeamId';

export interface TeamsRepository {
  getTeam(teamId: TeamId): Promise<Team>;
  addTeam(team: Team): Promise<Team>;
  updateTeam(team: Team): Promise<Team>;
}
