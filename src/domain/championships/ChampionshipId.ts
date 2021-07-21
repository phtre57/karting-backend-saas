import { Uuidv4 } from 'domain/ids/Uuidv4';

export class ChampionshipId extends Uuidv4 {
  value: string;

  constructor(value: string) {
    super(value, ChampionshipId.name);
  }

  static new() {
    return new ChampionshipId(Uuidv4.new(ChampionshipId.name).value);
  }
}
