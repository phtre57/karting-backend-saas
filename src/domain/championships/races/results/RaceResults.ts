import { DateTime } from 'domain/datetime';
import { RacerId } from 'domain/racers/RacerId';

export interface RaceResults {
  racerId: RacerId;
  qualifyingPosition: number;
  qualifyingBestTime: DateTime;
  racePosition: number;
  raceBestTime: DateTime;
}
