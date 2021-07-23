import { DateTime } from 'domain/datetime';
import { RacerId } from 'domain/racers/RacerId';
import { TeamId } from 'domain/teams/TeamId';

export interface RaceResults {
  racerId: RacerId;
  teamId: TeamId;
  qualifyingPosition: number;
  qualifyingBestTime: DateTime;
  racePosition: number;
  raceBestTime: DateTime;
  penaltyPoints: number;
}
