import { Uuidv4 } from '../ids/Uuidv4';
export class TeamId extends Uuidv4 {
  value: string;

  constructor(value: string) {
    super(value, TeamId.name);
  }

  static new() {
    return Uuidv4.new(TeamId.name);
  }
}
