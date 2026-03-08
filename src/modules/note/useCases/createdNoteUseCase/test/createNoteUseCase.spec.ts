import { NoteRepositoryInMemory } from 'src/modules/note/repositories/noteRepositoryInMemory';
import { CreateNoteUseCase } from '../createNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let createNoteUseCase: CreateNoteUseCase;

describe('Create note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to create note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'My Title',
      description: 'My description here',
      userId: '123123',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});
