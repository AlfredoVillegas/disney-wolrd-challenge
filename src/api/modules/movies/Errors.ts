export class MovieNotExist extends Error {
  constructor(id: string) {
    super(`movie not whit id: ${id} not exists`);
  }
}
