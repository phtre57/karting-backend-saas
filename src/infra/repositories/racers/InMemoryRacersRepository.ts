import { Racer } from '../../../domain/racers/Racer';
import { RacerId } from '../../../domain/racers/RacerId';
import { RacerNotFoundException } from '../../../domain/racers/repositories/exceptions/RacerNotFoundException';
import { RacersRepository } from '../../../domain/racers/repositories/RacersRepository';

export class InMemoryRacersRepository implements RacersRepository {
  racers: Record<string, Racer>;

  constructor(racers: Record<string, Racer>) {
    this.racers = racers;
  }

  async getRacer(racerId: RacerId): Promise<Racer> {
    if (!this.racers[racerId.value]) {
      throw new RacerNotFoundException(racerId);
    }

    return this.racers[racerId.value];
  }

  async addRacer(racer: Racer): Promise<Racer> {
    const { id } = racer;
    this.racers[id.value] = racer;

    return this.racers[id.value];
  }

  async updateRacer(racer: Racer): Promise<Racer> {
    const { id } = racer;
    if (!this.racers[id.value]) {
      throw new RacerNotFoundException(id);
    }
    return this.addRacer(racer);
  }
}
