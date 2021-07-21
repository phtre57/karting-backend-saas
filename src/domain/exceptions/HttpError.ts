export class HttpError extends Error {
  name: string;
  code: number;

  constructor(code: number, name: string, message: string) {
    super(message);
    this.code = code;
    this.name = name;
  }
}
