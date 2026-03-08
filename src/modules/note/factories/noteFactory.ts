import { Note } from '../entities/note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'Teste Make Note',
      userId: 'fakeId',
      description: 'Teste description make note',
      ...override,
    },
    id,
  );
};
