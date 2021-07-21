/**
 * @group unit
 */

import { Uuidv4 } from './Uuidv4';

describe('Uuidv4', () => {
  test('Given invalid format for id When constructing id Then error is thrown', () => {
    const id = 'patate';

    const action = () => new Uuidv4(id, 'senpai id');

    expect(action).toThrowError();
  });

  test('Given value format for id When constructing id Then id is constructed', () => {
    const id = '121bf979-0c91-4316-86b2-790e991a5a26';

    const actual = new Uuidv4(id, 'senpai id');

    expect(actual.value).toBe(id);
  });

  test('Given other id is equal When checking if ids are equal Then are equal', () => {
    const id = Uuidv4.new('patate');
    const otherId = new Uuidv4(id.value, 'patate');

    const actual = id.isEqual(otherId);

    expect(actual).toBe(true);
  });

  test('Given other id is not equal When checking if ids are equal Then are not equal', () => {
    const id = Uuidv4.new('patate');
    const otherId = Uuidv4.new('patate');

    const actual = id.isEqual(otherId);

    expect(actual).toBe(false);
  });

  test('Given other id type is not equal When checking if ids are equal Then are not equal', () => {
    const id = Uuidv4.new('patate');
    const otherId = new Uuidv4(id.value, 'patate 1');

    const actual = id.isEqual(otherId);

    expect(actual).toBe(false);
  });
});
