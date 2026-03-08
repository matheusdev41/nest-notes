import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { EditNoteUseCase } from '../editNoteUseCase/editNoteUseCase';
import { makeNote } from '../../factories/noteFactory';
import { makeUser } from 'src/modules/user/factories/userFactory';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to edit note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    const titleChanged = 'title changed';
    const descriptionChanged = 'description changed';

    await editNoteUseCase.execute({
      title: titleChanged,
      noteId: note.id,
      userId: user.id,
      description: descriptionChanged,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(titleChanged);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(
      descriptionChanged,
    );
  });

  it('Should be able to throw error when not found note', async () => {
    await expect(
      editNoteUseCase.execute({
        title: 'fakeTitle',
        noteId: 'fakeId',
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
      editNoteUseCase.execute({
        title: 'fakeTitle',
        noteId: note.id,
        userId: 'fakeId',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
