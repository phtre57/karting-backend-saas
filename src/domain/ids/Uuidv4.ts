import { v4 as uuidv4 } from 'uuid';

export class Uuidv4 {
  value: string;

  constructor(value: string, idType: string) {
    if (value == null || value == '') {
      throw new Error(`Invalid id format for: ${idType}`);
    }
    this.value = value;
  }

  static new(idType: string) {
    return new this(uuidv4(), idType);
  }
}
