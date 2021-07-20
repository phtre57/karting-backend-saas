import { TeamDto } from '../dtos/TeamDto';
import { NewTeam, Team } from '../../../../domain/teams/Team';
import { RacerAssembler } from '../../racers/assemblers/RacerAssembler';
import { RacerId } from '../../../../domain/racers/RacerId';

export class TeamAssembler {
  racerAssembler: RacerAssembler;

  constructor(racerAssembler: RacerAssembler) {
    this.racerAssembler = racerAssembler;
  }

  newTeamFromDto(teamDto: TeamDto): NewTeam {
    return {
      name: teamDto.name,
      racers: teamDto.racers.map((racer) => {
        return {
          ...racer,
          id: racer.id ? new RacerId(racer.id) : undefined,
        };
      }),
    };
  }

  // fromDto(teamDto: TeamDto): Team {
  //   // TODO: we need repo to add id maybe having id as optionnal?
  //   const team = new Team({
  //     id: new TeamId('patate'),
  //     name: teamDto.name,
  //     racers: {},
  //   });
  //   teamDto.racers.forEach((racer, index) => {
  //     team.addOrUpdateRacer(
  //       new Racer({
  //         id: new RacerId(index.toString()),
  //         firstName: racer.firstName,
  //         lastName: racer.lastName,
  //       })
  //     );
  //   });
  //   return team;
  // }

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
