import { DateTime } from 'domain/datetime';
import { RaceId } from './RaceId';
import { RaceTrack } from './RaceTrack';
import { RaceResults } from './results';

export interface Race {
  id: RaceId;
  raceTrack: RaceTrack;
  at: DateTime;
  raceResults: Array<RaceResults>;
}
