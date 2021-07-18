import { Racer } from '../racers/Racer';
import { RacerId } from '../racers/RacerId';
import { RacerNotInTeamException } from './exceptions/RacerNotInTeamException';
import { Team } from './Team';
import { TeamId } from './TeamId';

describe('Team', () => {
  const id = TeamId.new();
  const racerId = RacerId.new();
  let team: Team;

  beforeEach(() => {
    team = new Team({ id: id, racers: {}, name: 'pepito' });
  });

  test('When adding or updating racer Then adds racer to team racers', () => {
    const racer = new Racer({
      id: racerId,
      firstName: 'fel',
      lastName: 'patate',
    });

    team.addOrUpdateRacer(racer);

    expect(team.getRacer(racerId)).toBe(racer);
  });

  test('Given racer does not exist in team When getting racer Then racer not found in team', () => {
    const action = () => team.getRacer(racerId);

    expect(action).toThrow(RacerNotInTeamException);
  });

  test('Given racer does exist in team When getting racer Then racer found in team', () => {
    const racer = new Racer({
      id: racerId,
      firstName: 'fel',
      lastName: 'patate',
    });
    team.addOrUpdateRacer(racer);

    const actual = team.getRacer(racerId);

    expect(actual).toBe(racer);
  });

  test('Given racer does not exist When removing racer Then racer not found', () => {
    const action = () => team.removeRacer(racerId);

    expect(action).toThrow(RacerNotInTeamException);
  });

  test('Given racer does exist When removing racer Then racer is removed from team', () => {
    const racer = new Racer({
      id: racerId,
      firstName: 'fel',
      lastName: 'patate',
    });
    team.addOrUpdateRacer(racer);

    team.removeRacer(racerId);

    expect(team.racers[racerId.value]).toBeUndefined();
  });
});
