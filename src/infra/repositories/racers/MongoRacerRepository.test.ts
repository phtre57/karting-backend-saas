/**
 * @group unit
 */

import { MongoServerError } from 'mongodb';
import { Racer } from '../../../domain/racers/Racer';
import { RacerId } from '../../../domain/racers/RacerId';
import { CouldNotSaveRacerWithSameId } from '../../../domain/racers/repositories/exceptions';
import { DUPLICATE_KEY_ERROR_CODE } from '../mongoDb/MongoRepository';
import { handleMongoServerError, ID_INDEX } from './MongoRacersRepository';

describe('MongoRacerRepository', () => {
  const racer = new Racer({
    id: RacerId.new(),
    firstName: 'patate',
    lastName: 'lol',
  });

  describe('handleMongoServerError', () => {
    test('Given code is duplicate key and message contains id index When handling mongo error Then could not same racer with same id exception', () => {
      const error = new MongoServerError({ message: ID_INDEX });
      error.code = DUPLICATE_KEY_ERROR_CODE;

      const action = () => handleMongoServerError(error, racer);

      expect(action).toThrow(CouldNotSaveRacerWithSameId);
    });

    test('Given code is not duplicate key When handling mongo error Then error rethrown', () => {
      const error = new MongoServerError({ message: 'patate' });

      const action = () => handleMongoServerError(error, racer);

      expect(action).toThrow(MongoServerError);
    });
  });
});
