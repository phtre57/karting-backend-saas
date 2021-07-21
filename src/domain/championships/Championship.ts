import { DateTime } from 'domain/datetime';
import { ChampionshipId } from './ChampionshipId';
import { Race } from './races';

interface IChampionship {
  id: ChampionshipId;
  races: Array<Race>;
  from: DateTime;
  to: DateTime;
}

export class Championship {
  id: ChampionshipId;
  races: Array<Race>;
  from: DateTime;
  to: DateTime;

  constructor(championship: IChampionship) {
    this.id = championship.id;
    this.from = championship.from;
    this.to = championship.to;
    this.races = championship.races;
  }

  orderRacesByDate(): Array<Race> {}
}
