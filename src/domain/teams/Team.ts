import { Racer } from '../racers/Racer';
import { RacerId } from '../racers/RacerId';
import { RacerNotInTeamException } from './exceptions/RacerNotInTeamException';
import { TeamId } from './TeamId';

interface ITeam {
  id: TeamId;
  racers: Record<string, Racer>;
  name: string;
}

export class Team {
  id: TeamId;
  racers: Record<string, Racer>;
  name: string;

  constructor(team: ITeam) {
    this.id = team.id;
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
