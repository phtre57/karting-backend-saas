interface IRacer {
  name: string;
}

export class Racer {
  name: string;

  constructor({ name }: IRacer) {
    this.name = name
  }
}
