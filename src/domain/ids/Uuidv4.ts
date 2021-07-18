import { define, is } from 'superstruct';
import { v4 as uuidv4 } from 'uuid';
import isUuid from 'is-uuid';

// TODO: reviewers the error is mysterious
const uuidValidator = define('Uuid', (value: unknown) =>
  isUuid.v4(value as string)
);

export class Uuidv4 {
  value: string;

  constructor(value: string, idType: string) {
    if (!is(value, uuidValidator)) {
      throw new Error(`Invalid id format for: ${idType}`);
    }
    this.value = value;
  }

  static new(idType: string) {
    return new this(uuidv4(), idType);
  }
}
