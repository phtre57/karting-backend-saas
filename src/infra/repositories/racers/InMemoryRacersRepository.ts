import { Racer } from '../../../domain/racers/Racer';
import { RacerId } from '../../../domain/racers/RacerId';
import { RacerNotFoundException } from '../../../domain/racers/repositories/exceptions/RacerNotFoundException';
import { RacersRepository } from '../../../domain/racers/repositories/RacersRepository';

export class InMemoryRacersRepository implements RacersRepository {
  racers: Record<string, Racer>;

  constructor(racers: Record<string, Racer>) {
    this.racers = racers;
  }

  getRacer(racerId: RacerId): Racer {
    if (!this.racers[racerId.value]) {
      throw new RacerNotFoundException(racerId);
    }

    return this.racers[racerId.value];
  }

  addOrUpdateRacer(racer: Racer): Racer {
    const { id } = racer;
    if (!this.racers[id.value]) {
      throw new RacerNotFoundException(id);
    }
    this.racers[id.value] = racer;

    return this.racers[id.value];
  }
}
