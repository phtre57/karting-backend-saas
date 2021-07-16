import { Racer } from 'domain/racers/Racer';

export interface TeamEntity {
  id: string;
  name: string;
  racers: Record<string, Racer>;
}
