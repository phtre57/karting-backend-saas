import { Racer } from 'domain/racers/Racer';
import { Team } from 'domain/teams/Team';
import { TeamId } from 'domain/teams/TeamId';
import { buildRacer } from 'infra/repositories/racers/entities/RacerEntity';
import { Document } from 'mongodb';

export interface TeamEntity {
  id: string;
  name: string;
  racers: Record<string, Racer>;
}

export const buildTeam = (document: Document) => {
  const documentRacers = document.racers;
  const racers: Record<string, Racer> = {};
  const racersId = Object.keys(document.racers);
  racersId.forEach((id) => (racers[id] = buildRacer(documentRacers[id])));

  return new Team({
    id: new TeamId(document.id),
    name: document.name,
    racers: racers,
  });
};
