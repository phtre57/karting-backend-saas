/**
 * @group unit
 */

import { DateTime } from '../../datetime/DateTime';
import { RacerId } from '../../racers/RacerId';
import { RaceResults } from '../races/results';
import { ChampionshipCategory } from './ChampionshipCategory';

describe('ChampionshipCategory', () => {
  let category: ChampionshipCategory;
  const positionPoints: Record<number, number> = {
    1: 10,
    2: 8,
    3: 7,
    4: 6,
    5: 5,
    6: 4,
    7: 3,
    8: 2,
    9: 1,
    10: 1,
  };
  const defaultPoints = 0;

  beforeEach(() => {
    category = new ChampionshipCategory({
      positionPoints: positionPoints,
      qualifyingPositionPoints: positionPoints,
      pointsForBestRaceTime: 0,
      defaultRacePoints: defaultPoints,
      defaultQualifyingPoints: defaultPoints,
    });
  });
  describe('getPointsFromPosition', () => {
    test('Given position gives points When getting points from position Then points for position returned', () => {
      const position = 2;

      const actual = category.getPointsFromPosition(position);

      expect(actual).toBe(positionPoints[position]);
    });

    test('Given position does not give points When getting points from position Then default points returned', () => {
      const position = 103;

      const actual = category.getPointsFromPosition(position);

      expect(actual).toBe(defaultPoints);
    });
  });

  describe('getPointsFromResult', () => {
    test('Given penalty points and positions points exists When getting points from results Then points from category minus penalty returned', () => {
      const result: RaceResults = {
        racerId: RacerId.new(),
        teamId: RacerId.new(),
        racePosition: 1,
        qualifyingPosition: 2,
        qualifyingBestTime: DateTime.fromUnixTimestamp(60),
        raceBestTime: DateTime.fromUnixTimestamp(60),
        penaltyPoints: 1,
      };

      const actual = category.getPointsFromResult(result);

      expect(actual).toBe(17);
    });

    test('Given penalty points and positions points does not exist When getting points from results Then default points minus penalty returned', () => {
      const result: RaceResults = {
        racerId: RacerId.new(),
        teamId: RacerId.new(),
        racePosition: 1000,
        qualifyingPosition: 1000,
        qualifyingBestTime: DateTime.fromUnixTimestamp(60),
        raceBestTime: DateTime.fromUnixTimestamp(60),
        penaltyPoints: 1,
      };

      const actual = category.getPointsFromResult(result);

      expect(actual).toBe(-1);
    });
  });
});
