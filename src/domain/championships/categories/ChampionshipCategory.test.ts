/**
 * @group unit
 */

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
      pointsForPolePosition: 0,
      pointsForBestRaceTime: 0,
      defaultPoints: defaultPoints,
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
});
