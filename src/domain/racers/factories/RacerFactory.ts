import { NewRacer, Racer } from '../Racer';
import { RacerId } from '../RacerId';

export class RacerFactory {
  newRacer(newRacer: NewRacer) {
    const id = RacerId.new();
    return new Racer({
      id: id,
      firstName: newRacer.firstName,
      lastName: newRacer.firstName,
    });
  }
}
