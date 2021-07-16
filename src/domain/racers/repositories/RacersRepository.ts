import { Racer } from '../Racer';
import { RacerId } from '../RacerId';

export interface RacersRepository {
  getRacer(racerId: RacerId): Racer;
  addOrUpdateRacer(racer: Racer): Racer;
}
