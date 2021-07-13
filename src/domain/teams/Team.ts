import { Racer } from '../racers/Racer';
import { RacerId } from '../racers/RacerId';
import { RacerNotInTeamException } from './exceptions/RacerNotInTeamException';

interface ITeam {
  racers: Record<string, Racer>;
  name: string;
}

export class Team {
  racers: Record<string, Racer>;
  name: string;

  constructor(team: ITeam) {
    this.racers = team.racers;
    this.name = this.name;
  }

  addOrUpdateRacer(racer: Racer) {
    this.racers[racer.id.value] = racer;
  }

  removeRacer(racerId: RacerId) {
    if (!this.racers[racerId.value]) {
      throw new RacerNotInTeamException(racerId, this);
    }

    delete this.racers[racerId.value];
  }

  getRacer(racerId: RacerId) {
    if (!this.racers[racerId.value]) {
      throw new RacerNotInTeamException(racerId, this);
    }

    return this.racers[racerId.value];
  }
}
