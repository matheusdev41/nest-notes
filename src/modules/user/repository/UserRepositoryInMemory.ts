/* eslint-disable @typescript-eslint/require-await */
import { User } from '../entities/user.entity';
import { UserRepository } from './UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
