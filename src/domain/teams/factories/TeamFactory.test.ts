/**
 * @group unit
 */

import { RacerFactory } from '../../racers/factories/RacerFactory';
import { RacerId } from '../../racers/RacerId';
import { RacersRepository } from '../../racers/repositories/RacersRepository';
import { NewTeam } from '../Team';
import { TeamFactory } from './TeamFactory';

describe('TeamFactory', () => {
  let racerFactory: RacerFactory;
  let racersRepository: RacersRepository;
  let teamFactory: TeamFactory;
  let newRacerMock: jest.Mock;
  let getRacerMock: jest.Mock;
  let addRacerMock: jest.Mock;
  let zoId: RacerId;
  let felId: RacerId;

  const zoRacer = {
    firstName: 'zo',
    lastName: 'bese',
  };
  const felRacer = {
    firstName: 'fel',
    lastName: 'leb',
  };

  beforeEach(() => {
    zoId = RacerId.new();
    felId = RacerId.new();
    newRacerMock = jest.fn();
    newRacerMock
      .mockReturnValueOnce({
        id: RacerId.new(),
        ...zoRacer,
      })
      .mockReturnValueOnce({
        id: RacerId.new(),
        ...felRacer,
      });
    getRacerMock = jest.fn();
    getRacerMock
      .mockReturnValueOnce({
        id: zoId,
        ...zoRacer,
      })
      .mockReturnValueOnce({
        id: felId,
        ...felRacer,
      });
    addRacerMock = jest.fn();
    addRacerMock
      .mockReturnValueOnce({
        id: zoId,
        ...zoRacer,
      })
      .mockReturnValueOnce({
        id: felId,
        ...felRacer,
      });
    racerFactory = {
      newRacer: newRacerMock,
    };
    racersRepository = {
      getRacer: getRacerMock,
      updateRacer: jest.fn(),
      addRacer: addRacerMock,
    };
    teamFactory = new TeamFactory(racerFactory, racersRepository);
  });

  test('Given new racer When creating new team Then new racer created by racer factory', () => {
    const newTeam: NewTeam = {
      name: 'patate',
      racers: [
        {
          ...zoRacer,
        },
        {
          ...felRacer,
        },
      ],
    };

    teamFactory.newTeam(newTeam);

    expect(newRacerMock).toHaveBeenCalledTimes(2);
  });

  test('Given new racer When creating new team Then new racer added to repo', () => {
    const newTeam: NewTeam = {
      name: 'patate',
      racers: [
        {
          ...zoRacer,
        },
        {
          ...felRacer,
        },
      ],
    };

    teamFactory.newTeam(newTeam);

    expect(addRacerMock).toHaveBeenCalledTimes(2);
  });

  test('Given existing racer When creating new team Then new racer gotten with racer repo', () => {
    const newTeam: NewTeam = {
      name: 'patate',
      racers: [
        {
          id: zoId,
        },
        {
          id: felId,
        },
      ],
    };

    teamFactory.newTeam(newTeam);

    expect(getRacerMock).toHaveBeenCalledTimes(2);
  });
});
