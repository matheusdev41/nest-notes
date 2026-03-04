import { User } from '@prisma/client';

export class UserViewModel {
  static toHttp({ createdAt, email, id, name }: User) {
    return {
      id,
      email,
      name,
      createdAt,
    };
  }
}
