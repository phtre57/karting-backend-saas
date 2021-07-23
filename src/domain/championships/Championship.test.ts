/**
 * @group unit
 */

import { DateTime } from '../datetime/DateTime';
import { Championship } from './Championship';
import { ChampionshipId } from './ChampionshipId';
import {
  RaceAlreadyAddedToChampionshipWithSameDateTimeException,
  RaceAlreadyAddedToChampionshipException,
  RaceNotFoundInChampionshipException,
} from './exceptions';
import { Race, RaceId, RacerTrackId } from './races';
import { Standings } from './standings';
import { Team } from '../teams/Team';
import { TeamId } from '../teams/TeamId';

describe('Championship', () => {
  let championship: Championship;
  const race1: Race = {
    id: RaceId.new(),
    at: DateTime.fromFormat('2021-01-01', 'YYYY-MM-DD'),
    raceTrack: {
      id: RacerTrackId.new(),
      name: 'KCR karting',
    },
    raceResults: [],
  };
  const race2: Race = {
    id: RaceId.new(),
    at: DateTime.fromFormat('2021-01-02', 'YYYY-MM-DD'),
    raceTrack: {
      id: RacerTrackId.new(),
      name: 'KCR karting',
    },
    raceResults: [],
  };
  const race3: Race = {
    id: RaceId.new(),
    at: DateTime.fromFormat('2021-01-03', 'YYYY-MM-DD'),
    raceTrack: {
      id: RacerTrackId.new(),
      name: 'KCR karting',
    },
    raceResults: [],
  };

  beforeEach(() => {
    const races: Array<Race> = [race3, race1, race2];
    championship = new Championship({
      id: ChampionshipId.new(),
      from: DateTime.now(),
      to: DateTime.now(),
      races: races,
      teamsStandings: new Standings({}),
      racersStandings: new Standings({}),
      teams: {},
    });
  });

  describe('orderRacesByDate', () => {
    test('When ordering races by date Then races are ordered by dates', () => {
      const actual = championship.orderRacesByDate();

      expect(actual).toStrictEqual([race1, race2, race3]);
    });
  });

  describe('addRace', () => {
    test('Given race with same id already added When adding race Then race already added exception', () => {
      const newRace: Race = {
        id: race3.id,
        at: DateTime.now(),
        raceTrack: race3.raceTrack,
        raceResults: [],
      };

      const action = () => championship.addRace(newRace);

      expect(action).toThrow(RaceAlreadyAddedToChampionshipException);
    });

    test('Given race with same datetime already added When adding race Then race already added with same datetime exception', () => {
      const newRace: Race = {
        id: RaceId.new(),
        at: race3.at,
        raceTrack: race3.raceTrack,
        raceResults: [],
      };

      const action = () => championship.addRace(newRace);

      expect(action).toThrow(
        RaceAlreadyAddedToChampionshipWithSameDateTimeException
      );
    });

    test('When adding race Then is added to championship races', () => {
      const newRace: Race = {
        id: RaceId.new(),
        at: DateTime.fromFormat('2021-01-04', 'YYYY-MM-DD'),
        raceTrack: race3.raceTrack,
        raceResults: [],
      };

      championship.addRace(newRace);

      expect(championship.races.length).toBe(4);
    });
  });

  describe('deleteRace', () => {
    test('Given race does not exists in championship When deleting race Then race not found in championship', () => {
      const action = () => championship.deleteRace(RaceId.new());

      expect(action).toThrow(RaceNotFoundInChampionshipException);
    });

    test('When deleting race Then is deleted', () => {
      championship.deleteRace(race3.id);

      expect(championship.races.length).toBe(2);
    });
  });

  describe('updateRace', () => {
    test('Given race does not exists in championship When updating race Then race not found in championship', () => {
      const action = () =>
        championship.updateRace({
          id: RaceId.new(),
          at: DateTime.now(),
          raceTrack: race3.raceTrack,
          raceResults: [],
        });

      expect(action).toThrow(RaceNotFoundInChampionshipException);
    });

    test('Given race has same datetime as another race in championship When updating race Then race already added with same datetime', () => {
      const action = () =>
        championship.updateRace({
          id: race3.id,
          at: race2.at,
          raceTrack: race3.raceTrack,
          raceResults: [],
        });

      expect(action).toThrow(
        RaceAlreadyAddedToChampionshipWithSameDateTimeException
      );
    });

    test('Given race exists When updating race Then race is updated', () => {
      const race: Race = {
        id: race3.id,
        at: DateTime.fromFormat('2021-01-10', 'YYYY-MM-DD'),
        raceTrack: race3.raceTrack,
        raceResults: [],
      };

      championship.updateRace(race);

      const actual = championship.findRace(race.id);

      expect(actual).toStrictEqual(race);
    });
  });

  describe('findRace', () => {
    test('Given race does not exist When finding race Then race not found', () => {
      const action = () => championship.findRace(RaceId.new());

      expect(action).toThrow(RaceNotFoundInChampionshipException);
    });

    test('When finding race Then race found', () => {
      const actual = championship.findRace(race3.id);

      expect(actual).toStrictEqual(race3);
    });
  });

  describe('addTeams', () => {
    test('When adding Teams Then all teams are added', () => {
      championship.addTeams([
        new Team({
          id: TeamId.new(),
          name: 'pepito',
          racers: {},
        }),
        new Team({
          id: TeamId.new(),
          name: 'pepito 2',
          racers: {},
        }),
      ]);

      expect(Object.keys(championship.teams).length).toBe(2);
    });
  });
});
