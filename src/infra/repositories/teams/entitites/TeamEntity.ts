import { Racer } from 'domain/racers/Racer';
import { Team } from 'domain/teams/Team';
import { TeamId } from 'domain/teams/TeamId';
import { Document } from 'mongodb';

export interface TeamEntity {
  id: string;
  name: string;
  racers: Record<string, Racer>;
}

export const buildTeam = (document: Document) => {
  return new Team({
    id: new TeamId(document.id),
    name: document.name,
    racers: document.racers,
  });
};
