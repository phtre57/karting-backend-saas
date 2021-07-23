/**
 * @group unit
 */

import { Standings } from './Standings';
import { Standing } from './Standing';

describe('Standings', () => {
  let standings: Standings;
  const idNotInStandings = 'patate';

  beforeEach(() => {
    standings = new Standings({
      '1': 7,
      '2': 1,
      '3': 5,
      '4': 6,
      '5': 10,
      '6': 2,
    });
  });
  describe('orderByPoints', () => {
    test('When ordering standings by points Then standings are ordered from bigger points to smaller points', () => {
      const actual = standings.orderByPoints();
      const expected: Array<Standing> = [
        {
          id: '5',
          points: 10,
        },
        {
          id: '1',
          points: 7,
        },
        {
          id: '4',
          points: 6,
        },
        {
          id: '3',
          points: 5,
        },
        {
          id: '6',
          points: 2,
        },
        {
          id: '2',
          points: 1,
        },
      ];

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('updateStandings', () => {
    test('Given no points given to id When updating standings Then points are added from 0', () => {
      standings.updateStandings(idNotInStandings, 10);

      expect(standings.standings[idNotInStandings]).toBe(10);
    });

    test('When updating standings Then points are updated to these points', () => {
      standings.updateStandings(idNotInStandings, 10);
      standings.updateStandings(idNotInStandings, 3);

      expect(standings.standings[idNotInStandings]).toBe(13);
    });
  });
});
