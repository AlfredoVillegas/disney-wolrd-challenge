export class CharacterNotExist extends Error {
  constructor(id: string) {
    super(`Character whit id: ${id} not exists`);
  }
}
