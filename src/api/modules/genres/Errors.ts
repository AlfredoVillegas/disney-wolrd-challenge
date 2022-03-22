export class GenreNotExist extends Error {
  constructor(id: string) {
    super(`Genre whit id: ${id} not exists`);
  }
}
