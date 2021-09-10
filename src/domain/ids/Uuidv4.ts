import { define, is } from 'superstruct';
import { v4 as uuidv4, validate } from 'uuid';

export const uuidValidator = define<string>('uuid', (value: unknown): boolean =>
  validate(value as string)
);

export class Uuidv4 {
  value: string;
  idType: string;

  constructor(value: string, idType: string) {
    if (!is(value, uuidValidator)) {
      throw new Error(
        `Invalid id format for id type: ${idType} and id: ${value}`
      );
    }
    this.value = value;
    this.idType = idType;
  }

  isEqual(other: Uuidv4): boolean {
    return this.value === other.value && this.idType === other.idType;
  }

  static new(idType: string) {
    return new this(uuidv4(), idType);
  }
}
