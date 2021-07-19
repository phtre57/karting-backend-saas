import { Uuidv4 } from '../ids/Uuidv4';

export class RacerId extends Uuidv4 {
  value: string;

  constructor(value: string) {
    super(value, RacerId.name);
  }

  static new() {
    return Uuidv4.new(RacerId.name);
  }
}
