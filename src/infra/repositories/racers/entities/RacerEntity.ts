import { Document } from 'mongodb';

import { Racer } from 'domain/racers/Racer';
import { RacerId } from 'domain/racers/RacerId';

export interface RacerEntity {
  id: string;
  firstName: string;
  lastName: string;
}

export const buildRacer = (document: Document) => {
  return new Racer({
    id: new RacerId(document.id),
    firstName: document.firstName,
    lastName: document.lastName,
  });
};
