import { RacerFactory } from '../../racers/factories/RacerFactory';
import { RacersRepository } from '../../racers/repositories/RacersRepository';
import { NewTeam, Team } from '../Team';
import { TeamId } from '../TeamId';

export class TeamFactory {
  racerFactory: RacerFactory;
  racersRepository: RacersRepository;

  constructor(racerFactory: RacerFactory, racersRepository: RacersRepository) {
    this.racerFactory = racerFactory;
    this.racersRepository = racersRepository;
  }

  async newTeam(newTeam: NewTeam): Promise<Team> {
    const id = TeamId.new();
    const team = new Team({ id: id, name: newTeam.name, racers: {} });
    await Object.values(newTeam.racers).forEach(async (racer) => {
      if (racer.id == undefined) {
        const newRacer = this.racerFactory.newRacer(racer);
        this.racersRepository.addRacer(newRacer);
        team.addOrUpdateRacer(newRacer);
      } else {
        const repoRacer = await this.racersRepository.getRacer(racer.id);
        team.addOrUpdateRacer(repoRacer);
      }
    });
    return team;
  }
}
