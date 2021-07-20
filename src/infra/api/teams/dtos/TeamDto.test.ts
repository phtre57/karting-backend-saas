/**
 * @group unit
 */

import { create, StructError } from 'superstruct';
import { RacerId } from '../../../../domain/racers/RacerId';
import { TeamId } from '../../../../domain/teams/TeamId';
import { TeamSchema, TeamIdSchema } from './TeamDto';

describe('TeamDto', () => {
  describe('TeamSchema', () => {
    test('Given name is empty When creating dto Then validation exception thrown', () => {
      const action = () =>
        create(
          {
            id: RacerId.new(),
            name: '',
            racers: [],
          },
          TeamSchema
        );

      expect(action).toThrow(StructError);
    });

    test('Given id is not uuid When creating dto Then validation exception thrown', () => {
      const action = () =>
        create(
          {
            id: 'patate',
            name: 'name',
            racers: [],
          },
          TeamSchema
        );

      expect(action).toThrow(StructError);
    });

    test('Given no id When creating dto Then creates dto', () => {
      const actual = create(
        {
          name: 'name',
          racers: [],
        },
        TeamSchema
      );

      expect(actual).toStrictEqual({
        id: undefined,
        name: 'name',
        racers: [],
      });
    });
  });

  describe('TeamsIdSchema', () => {
    test('Given id not uuid When creating dto Then validation exception thrown', () => {
      const action = () =>
        create(
          {
            id: 'patate',
          },
          TeamIdSchema
        );

      expect(action).toThrow(StructError);
    });

    test('Given id is uuid When creating dto Then dto is created', () => {
      const id = TeamId.new().value;
      const actual = create(
        {
          id: id,
        },
        TeamIdSchema
      );

      expect(actual).toStrictEqual({
        id: id,
      });
    });
  });
});
