import { User } from "src/modules/user/entities/user.entity";
import { User as UserRaw } from "generated/prisma/browser";

export class PrismaUserMapper{
    static toPrisma({ createdAt, email, name, password, id }:User): UserRaw {
        return {
            createdAt, 
            email, 
            name, 
            password, 
            id 
        };
    }
}