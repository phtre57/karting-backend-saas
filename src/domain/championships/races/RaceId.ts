import { Uuidv4 } from 'domain/ids/Uuidv4';

export class RaceId extends Uuidv4 {
  value: string;

  constructor(value: string) {
    super(value, RaceId.name);
  }

  static new() {
    return new RaceId(Uuidv4.new(RaceId.name).value);
  }
}
