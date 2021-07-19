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

  test('Given valie format for id When constructing id Then id is constructed', () => {
    const id = '121bf979-0c91-4316-86b2-790e991a5a26';

    const actual = new Uuidv4(id, 'senpai id');

    expect(actual.value).toBe(id);
  });
});
