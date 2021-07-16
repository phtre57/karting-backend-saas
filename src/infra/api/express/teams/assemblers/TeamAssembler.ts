import { TeamDto } from '../../../../../services/teams/dtos/TeamDto';
import { Team } from '../../../../../domain/teams/Team';
import { RacerAssembler } from '../../racers/assemblers/RacerAssembler';
import { Racer } from '../../../../../domain/racers/Racer';
import { RacerId } from '../../../../../domain/racers/RacerId';
import { TeamId } from '../../../../../domain/teams/TeamId';

export class TeamAssembler {
  racerAssembler: RacerAssembler;

  constructor(racerAssembler: RacerAssembler) {
    this.racerAssembler = racerAssembler;
  }

  fromDto(teamDto: TeamDto): Team {
    // TODO: we need repo to add id maybe having id as optionnal?
    const team = new Team({
      id: new TeamId('patate'),
      name: teamDto.name,
      racers: {},
    });
    teamDto.racers.forEach((racer, index) => {
      // TODO: we need repo to add id maybe having id as optionnal?
      team.addOrUpdateRacer(
        new Racer({
          id: new RacerId(index.toString()),
          firstName: racer.firstName,
          lastName: racer.lastName,
        })
      );
    });
    return team;
  }

  toDto(team: Team): TeamDto {
    return {
      id: team.id?.value,
      name: team.name,
      racers: Object.values(team.racers).map((racer) =>
        this.racerAssembler.toDto(racer)
      ),
    };
  }
}
