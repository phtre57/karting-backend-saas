import { Racer } from '../../../../../domain/racers/Racer';
import { RacerDto } from '../dtos/RacerDto';

export class RacerAssembler {
  fromDto(racerDto: RacerDto): Racer {
    return new Racer({ id: racerDto.id, firstName: racerDto.firstName, lastName: racerDto.lastName });
  }

  toDto(racer: Racer): RacerDto {
    return {
      id: racer.id.value,
      firstName: racer.firstName,
      lastName: racer.lastName,
      fullName: racer.fullName,
    };
  }
}
