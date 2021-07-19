/**
 * @group unit
 */

import { MongoServerError } from 'mongodb';

import { CouldNotSaveTeamWithSameName } from '../../../domain/teams/repository/exceptions/CouldNotSaveTeamWithSameName';
import { CouldNotSaveTeamWithSameId } from '../../../domain/teams/repository/exceptions/CouldNotSaveTeamWithSameId';
import { Team } from '../../../domain/teams/Team';
import { TeamId } from '../../../domain/teams/TeamId';
import {
  DUPLICATE_KEY_ERROR_CODE,
  handleMongoServerError,
  ID_INDEX,
  NAME_INDEX,
} from './MongoTeamsRepository';

describe('MongoTeamsRepository', () => {
  const team = new Team({
    id: TeamId.new(),
    name: 'patate',
    racers: {},
  });

  describe('handleMongoServerError', () => {
    test('Given error code is duplicate key and duplicate key is name When handling error Then could not save team with same name exception is thrown', () => {
      const error = new MongoServerError({ message: NAME_INDEX });
      error.code = DUPLICATE_KEY_ERROR_CODE;

      const action = () => handleMongoServerError(error, team);

      expect(action).toThrow(CouldNotSaveTeamWithSameName);
    });

    test('Given error code is duplicate key and duplicate key is id When handling error Then could not save team with same id exception is thrown', () => {
      const error = new MongoServerError({ message: ID_INDEX });
      error.code = DUPLICATE_KEY_ERROR_CODE;

      const action = () => handleMongoServerError(error, team);

      expect(action).toThrow(CouldNotSaveTeamWithSameId);
    });

    test('Given error code is duplicate key and duplicate key not id nor name When handling error Then exception is rethrown', () => {
      const error = new MongoServerError({ message: 'patate' });
      error.code = DUPLICATE_KEY_ERROR_CODE;

      const action = () => handleMongoServerError(error, team);

      expect(action).toThrow(error);
    });

    test('Given error code is not duplicate key When handling error Then exception is rethrown', () => {
      const error = new MongoServerError({ message: 'patate' });

      const action = () => handleMongoServerError(error, team);

      expect(action).toThrow(error);
    });
  });
});
