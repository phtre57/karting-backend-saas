import { RacerFactory } from '../../racers/factories/RacerFactory';
import { RacersRepository } from '../../racers/repositories/RacersRepository';
import { NewTeam, Team } from '../Team';
import { TeamId } from '../TeamId';

// TODO: Test me plz
export class TeamFactory {
  racerFactory: RacerFactory;
  racersRepository: RacersRepository;

  constructor(racerFactory: RacerFactory, racersRepository: RacersRepository) {
    this.racerFactory = racerFactory;
    this.racersRepository = racersRepository;
  }

  newTeam(newTeam: NewTeam) {
    const id = TeamId.new();
    const team = new Team({ id: id, name: newTeam.name, racers: {} });
    Object.values(newTeam.racers).forEach((racer) => {
      if (racer.id == undefined) {
        // TODO: add racer to repo here??
        team.addOrUpdateRacer(this.racerFactory.newRacer(racer));
      } else {
        team.addOrUpdateRacer(this.racersRepository.getRacer(racer.id));
      }
    });
    return team;
  }
}
