import { Racer } from './Racer';
import { RacerId } from './RacerId';

describe('Racer', () => {
  test('When getting full name Then full name is composed of first name and last name', () => {
    const actual = new Racer({ id: new RacerId('racerId'), firstName: 'patate', lastName: 'smashed' });

    expect(actual.fullName).toBe('patate smashed');
  });
});
