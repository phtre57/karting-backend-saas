import { Document } from 'mongodb';
import { Racer } from 'domain/racers/Racer';
import { Team } from 'domain/teams/Team';
import { TeamId } from 'domain/teams/TeamId';
import {
  buildRacer,
  RacerEntity,
  toRacerEntity,
} from 'infra/repositories/racers/entities/RacerEntity';

export interface TeamEntity {
  id: string;
  name: string;
  racers: Record<string, RacerEntity>;
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

export const toTeamEntity = (team: Team): TeamEntity => {
  const racers: Record<string, RacerEntity> = Object.values(team.racers).reduce(
    (acc, racer) => {
      return {
        ...acc,
        [racer.id.value]: toRacerEntity(racer),
      };
    },
    {}
  );

  return {
    id: team.id.value,
    name: team.name,
    racers: racers,
  };
};
