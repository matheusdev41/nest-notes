import { User } from "src/modules/user/entities/user.entity";
import { UserRepository } from "src/modules/user/repository/UserRepository";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    public users: User[] = [];

    constructor (private prisma: PrismaService){}
    async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if(!user) return null;

    return user;
  }

    async create(user: User): Promise<void> {
        const userRaw = PrismaUserMapper.toPrisma(user);

        await this.prisma.user.create({
            data:userRaw,
        });
    }
}