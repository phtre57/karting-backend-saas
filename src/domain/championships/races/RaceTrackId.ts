import { Uuidv4 } from 'domain/ids/Uuidv4';

export class RaceTrackId extends Uuidv4 {
  value: string;

  constructor(value: string) {
    super(value, RaceTrackId.name);
  }

  static new() {
    return new RaceTrackId(Uuidv4.new(RaceTrackId.name).value);
  }
}
