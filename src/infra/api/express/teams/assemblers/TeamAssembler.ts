import { create } from 'superstruct';
import { TeamDto, TeamSchema } from '../dtos/TeamDto';
import { Team } from '../../../../../domain/teams/Team';
import { TeamId } from '../../../../../domain/teams/TeamId';
import { Racer } from '../../../../../domain/racers/Racer';
import { RacerId } from '../../../../../domain/racers/RacerId';

export class TeamAssembler {
  fromDto(teamDto: any): Team {
    const teamValidated = create(teamDto, TeamSchema);
    // TODO: we need repo to add id maybe having id as optionnal?
    const team = new Team({ id: new TeamId('patate'), name: teamValidated.name, racers: {} });
    teamValidated.racers.forEach((racer, index) => {
      // TODO: we need repo to add id maybe having id as optionnal?
      team.addOrUpdateRacer(
        new Racer({ id: new RacerId(index.toString()), firstName: racer.firstName, lastName: racer.lastName })
      );
    });
    return team;
  }

  toDto(team: Team): TeamDto {
    return {
      id: team.id.value,
      name: team.name,
      racers: Object.values(team.racers),
    };
  }
}
