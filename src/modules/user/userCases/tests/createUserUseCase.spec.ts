import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../../repository/UserRepositoryInMemory';
import { CreateUserUseCase } from '../createUserUseCase/createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("Should be able to create user", async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: "email@email",
      name: "Matheus",
      password: "123123",
    })

    expect(userRepositoryInMemory.users).toEqual([user]);
  });
  it("Should be able to create user with password encrypted", async () => {
    const userPasswordWithoutEncryption = "123123"

    const user = await createUserUseCase.execute({
      email: "email@email",
      name: "Matheus",
      password: "123123",
    });

    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncryption, 
      user.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });
});