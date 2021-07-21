import { DateTime } from 'domain/datetime';
import { ChampionshipId } from './ChampionshipId';
import {
  RaceAlreadyAddedToChampionshipException,
  RaceAlreadyAddedToChampionshipWithSameDateTimeException,
  RaceNotFoundInChampionshipException,
} from './exceptions';
import { Race, RaceId } from './races';

interface RaceExists {
  exists: boolean;
  index: number;
}

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

  addRace(newRace: Race): void {
    this.validateRaceNotAlreadyAdded(newRace);
    this.validateIfRaceAlreadyAddedAtSameDateTime(newRace);
    this.races.push(newRace);
  }

  updateRace(updatedRace: Race): void {
    const { exists: raceExists, index } = this.raceExists(updatedRace.id);
    if (!raceExists) {
      throw new RaceNotFoundInChampionshipException(this, updatedRace.id);
    }
    this.validateIfRaceAlreadyAddedAtSameDateTime(updatedRace);
    this.races[index] = updatedRace;
  }

  deleteRace(raceId: RaceId): void {
    const { exists: raceExists } = this.raceExists(raceId);
    if (!raceExists) {
      throw new RaceNotFoundInChampionshipException(this, raceId);
    }
    this.races = this.races.filter((race) => !race.id.isEqual(raceId));
  }

  findRace(raceId: RaceId): Race {
    const { exists, index } = this.raceExists(raceId);
    if (!exists) {
      throw new RaceNotFoundInChampionshipException(this, raceId);
    }
    return this.races[index];
  }

  orderRacesByDate(): Array<Race> {
    const orderedRaces = [...this.races];
    return orderedRaces.sort((race, otherRace) => {
      const { datetime } = race;
      const { datetime: otherDateTime } = otherRace;
      if (datetime.isBefore(otherDateTime)) {
        return -1;
      }
      if (datetime.isAfter(otherDateTime)) {
        return 1;
      }
      return 0;
    });
  }

  private validateRaceNotAlreadyAdded(newRace: Race): void {
    const { exists: raceExists } = this.raceExists(newRace.id);
    if (raceExists) {
      throw new RaceAlreadyAddedToChampionshipException(this, newRace);
    }
  }

  private validateIfRaceAlreadyAddedAtSameDateTime(newRace: Race): void {
    const raceExists: boolean = this.races.some((race) =>
      race.datetime.isEqual(newRace.datetime)
    );
    if (raceExists) {
      throw new RaceAlreadyAddedToChampionshipWithSameDateTimeException(
        this,
        newRace
      );
    }
  }

  private raceExists(raceId: RaceId): RaceExists {
    const index = this.races.findIndex((race) => race.id.isEqual(raceId));
    const exists = index >= 0 ? true : false;
    return {
      exists: exists,
      index: index,
    };
  }
}
