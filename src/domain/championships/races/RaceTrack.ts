import { RacerTrackId } from './RaceTrackId';

export interface RaceTrack {
  id: RacerTrackId;
  name: string;
  url?: string;
}
