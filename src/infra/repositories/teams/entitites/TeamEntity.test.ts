import { Racer } from '../../../../domain/racers/Racer';
import { RacerId } from '../../../../domain/racers/RacerId';
import { Team } from '../../../../domain/teams/Team';
import { TeamId } from '../../../../domain/teams/TeamId';
import { toTeamEntity } from './TeamEntity';

describe('TeamEntity', () => {
  describe('toTeamEntity', () => {
    const teamId = TeamId.new();
    const racerId = RacerId.new();
    const anotherRacerId = RacerId.new();
    test('When transforming team into entity Then team is transformed in good format', () => {
      const team = new Team({
        id: teamId,
        name: 'patate',
        racers: {
          [racerId.value]: new Racer({
            id: racerId,
            firstName: 'zo',
            lastName: 'bese',
          }),
          [anotherRacerId.value]: new Racer({
            id: anotherRacerId,
            firstName: 'fel',
            lastName: 'leb',
          }),
        },
      });

      const actual = toTeamEntity(team);

      expect(actual).toStrictEqual({
        id: teamId.value,
        name: 'patate',
        racers: {
          [racerId.value]: {
            id: racerId.value,
            firstName: 'zo',
            lastName: 'bese',
          },
          [anotherRacerId.value]: {
            id: anotherRacerId.value,
            firstName: 'fel',
            lastName: 'leb',
          },
        },
      });
    });
  });
});
