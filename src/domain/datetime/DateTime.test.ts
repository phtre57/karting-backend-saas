/**
 * @group unit
 */

import { DateTime } from './DateTime';

describe('DateTime', () => {
  describe('isAfter', () => {
    test('Given other date is before When checking if date is after Then date is after', () => {
      const date = DateTime.fromFormat('2010-01-01', 'YYYY-MM-DD');
      const isBeforeDate = DateTime.fromFormat('2009-01-01', 'YYYY-MM-DD');

      const actual = date.isAfter(isBeforeDate);

      expect(actual).toBe(true);
    });

    test('Given other date is after When checking if date is after Then date is not after', () => {
      const date = DateTime.fromFormat('2010-01-01', 'YYYY-MM-DD');
      const isAfterDate = DateTime.fromFormat('2011-01-01', 'YYYY-MM-DD');

      const actual = date.isAfter(isAfterDate);

      expect(actual).toBe(false);
    });

    test('Given other date is after When checking if date is before Then date is before', () => {
      const date = DateTime.fromFormat('2010-01-01', 'YYYY-MM-DD');
      const isAfterDate = DateTime.fromFormat('2011-01-01', 'YYYY-MM-DD');

      const actual = date.isBefore(isAfterDate);

      expect(actual).toBe(true);
    });

    test('Given other date is before When checking if date is before Then date is not before', () => {
      const date = DateTime.fromFormat('2010-01-01', 'YYYY-MM-DD');
      const isBeforeDate = DateTime.fromFormat('2009-01-01', 'YYYY-MM-DD');

      const actual = date.isBefore(isBeforeDate);

      expect(actual).toBe(false);
    });

    test('Given other date is equal When checking if is equal Then dates are equal', () => {
      const date = DateTime.fromFormat('2010-01-01', 'YYYY-MM-DD');
      const isEqualDate = DateTime.fromFormat('2010-01-01', 'YYYY-MM-DD');

      const actual = date.isEqual(isEqualDate);

      expect(actual).toBe(true);
    });

    test('Given other date is not equal When checking if is equal Then dates are not equal', () => {
      const date = DateTime.fromFormat('2010-01-01', 'YYYY-MM-DD');
      const isNotEqualDate = DateTime.fromFormat('2009-01-01', 'YYYY-MM-DD');

      const actual = date.isEqual(isNotEqualDate);

      expect(actual).toBe(false);
    });
  });
});
