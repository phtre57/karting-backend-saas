import { RacerId } from '../../RacerId';

export class RacerNotFoundException extends Error {
  constructor(racerId: RacerId) {
    super(`Racer not found with id: ${racerId.value}`);
  }
}
