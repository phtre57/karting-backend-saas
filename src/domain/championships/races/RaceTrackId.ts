import { Uuidv4 } from 'domain/ids/Uuidv4';

export class RacerTrackId extends Uuidv4 {
  value: string;

  constructor(value: string) {
    super(value, RacerTrackId.name);
  }

  static new() {
    return new RacerTrackId(Uuidv4.new(RacerTrackId.name).value);
  }
}
