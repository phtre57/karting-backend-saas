import { Racer } from '../Racer';
import { RacerId } from '../RacerId';

export interface RacersRepository {
  getRacer(racerId: RacerId): Racer;
  addRacer(racer: Racer): Racer;
  updateRacer(racer: Racer): Racer;
}
