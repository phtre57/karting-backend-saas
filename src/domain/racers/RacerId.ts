import { Uuidv4 } from '../ids/Uuidv4';

export class RacerId extends Uuidv4 {
  value: string;

  constructor(value: string) {
    super(value, typeof RacerId);
  }

  static new() {
    return Uuidv4.new(typeof RacerId);
  }
}
