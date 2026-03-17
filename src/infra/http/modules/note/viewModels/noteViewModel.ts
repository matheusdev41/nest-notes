import { Note } from '@prisma/client';

export class NoteViewModel {
  static toHttp({ createdAt, description, id, title }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
    };
  }
}
