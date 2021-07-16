import { object, string, validate } from 'superstruct';
import { RacerId } from './RacerId';

export interface NewRacer {
  id?: RacerId;
  firstName?: string;
  lastName?: string;
}

const IRacerValidation = object({
  firstName: string(),
  lastName: string(),
});

interface IRacer extends NewRacer {
  id: RacerId;
  firstName: string;
  lastName: string;
}

export class Racer {
  id: RacerId;
  firstName: string;
  lastName: string;

  constructor(racer: IRacer) {
    validate(racer, IRacerValidation);
    this.id = racer.id;
    this.firstName = racer.firstName;
    this.lastName = racer.lastName;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
