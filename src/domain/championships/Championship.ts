import { DateTime } from 'domain/datetime';
import { Team } from 'domain/teams/Team';
import { ChampionshipId } from './ChampionshipId';
import {
  RaceAlreadyAddedToChampionshipException,
  RaceAlreadyAddedToChampionshipWithSameDateTimeException,
  RaceNotFoundInChampionshipException,
} from './exceptions';
import { Race, RaceId } from './races';
import { Standings } from './standings';

interface RaceExists {
  exists: boolean;
  index: number;
}

interface IChampionship {
  id: ChampionshipId;
  teams: Record<string, Team>;
  races: Array<Race>;
  from: DateTime;
  to: DateTime;
  teamsStandings: Standings;
  racersStandings: Standings;
}

export class Championship {
  id: ChampionshipId;
  teams: Record<string, Team>;
  races: Array<Race>;
  from: DateTime;
  to: DateTime;
  teamsStandings: Standings;
  racersStandings: Standings;

  constructor(championship: IChampionship) {
    this.id = championship.id;
    this.from = championship.from;
    this.to = championship.to;
    this.races = championship.races;
    this.teams = championship.teams;
    this.teamsStandings = championship.teamsStandings;
    this.racersStandings = championship.racersStandings;
  }

  addTeams(teams: Array<Team>): void {
    teams.forEach((team) => (this.teams[team.id.value] = team));
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
      const { at: datetime } = race;
      const { at: otherDateTime } = otherRace;
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
      race.at.isEqual(newRace.at)
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
