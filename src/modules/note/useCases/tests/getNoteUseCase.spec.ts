import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { GetNoteUseCase } from '../getNoteUseCase/getNoteUseCase';
import { makeNote } from '../../factories/noteFactory';
import { makeUser } from 'src/modules/user/factories/userFactory';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUseCase;

describe('Get Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });

  it('Shoub be able to get note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const result = await getNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(result).toEqual(note);
  });

  it('Should be able to throw error when not found note', async () => {
    await expect(
      getNoteUseCase.execute({
        noteId: 'fakeID',
        userId: 'fakeId',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw error when note has another user', async () => {
    const note = makeNote({
      userId: 'user-1',
    });

    noteRepositoryInMemory.notes = [note];

    await expect(
      getNoteUseCase.execute({
        noteId: note.id,
        userId: 'fakeId',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
