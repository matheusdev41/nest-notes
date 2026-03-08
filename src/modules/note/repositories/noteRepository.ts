import { Note } from '../entities/node';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
}
