import { DateTime } from 'domain/datetime';
import { RaceId } from './RaceId';
import { RaceTrack } from './RaceTrack';

export interface Race {
  id: RaceId;
  raceTrack: RaceTrack;
  at: DateTime;
}
