/**
 * @group unit
 */

import { create, StructError } from 'superstruct';
import { RacerId } from '../../../../domain/racers/RacerId';
import { RacerSchema } from './RacerDto';

describe('RacerSchema', () => {
  test('Given firstName empty When creating dto Then validation exception thrown', () => {
    const action = () =>
      create(
        {
          id: RacerId.new().value,
          firstName: '',
          lastName: 'patate',
          fullName: 'patate',
        },
        RacerSchema
      );

    expect(action).toThrow(StructError);
  });

  test('Given lastName empty When creating dto Then validation exception thrown', () => {
    const action = () =>
      create(
        {
          id: RacerId.new().value,
          firstName: 'patate',
          lastName: '',
          fullName: 'patate',
        },
        RacerSchema
      );

    expect(action).toThrow(StructError);
  });

  test('Given fullName empty When creating dto Then validation exception thrown', () => {
    const action = () =>
      create(
        {
          id: RacerId.new().value,
          firstName: 'patate',
          lastName: 'patate',
          fullName: '',
        },
        RacerSchema
      );

    expect(action).toThrow(StructError);
  });

  test('Given id not uuid empty When creating dto Then validation exception thrown', () => {
    const action = () =>
      create(
        {
          id: 'patate',
          firstName: 'patate',
          lastName: 'patate',
          fullName: 'patate',
        },
        RacerSchema
      );

    expect(action).toThrow(StructError);
  });

  test('Given all fields in good format When creating dto Then dto created', () => {
    const id = RacerId.new().value;
    const actual = create(
      {
        id: id,
        firstName: 'patate',
        lastName: 'patate',
        fullName: 'patate',
      },
      RacerSchema
    );

    expect(actual).toStrictEqual({
      id: id,
      firstName: 'patate',
      lastName: 'patate',
      fullName: 'patate',
    });
  });
});
