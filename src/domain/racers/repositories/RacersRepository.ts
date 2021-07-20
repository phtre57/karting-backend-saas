import { Racer } from '../Racer';
import { RacerId } from '../RacerId';

export interface RacersRepository {
  getRacer(racerId: RacerId): Promise<Racer>;
  addRacer(racer: Racer): Promise<Racer>;
  updateRacer(racer: Racer): Promise<Racer>;
}
