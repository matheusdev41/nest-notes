import { User } from "generated/prisma";

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