import { Racer } from 'domain/racers/Racer';
import { RacerId } from 'domain/racers/RacerId';
import { RacersRepository } from 'domain/racers/repositories/RacersRepository';

export interface IRacersService {
  getRacer(racerId: RacerId): Promise<Racer>;
}

export class RacersService implements IRacersService {
  racersRepository: RacersRepository;

  constructor(racersRepository: RacersRepository) {
    this.racersRepository = racersRepository;
  }

  getRacer(racerId: RacerId): Promise<Racer> {
    return this.racersRepository.getRacer(racerId);
  }
}
