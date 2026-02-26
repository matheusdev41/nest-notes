import { Injectable } from "@nestjs/common";
import { User } from "src/modules/user/entities/user.entity";
import { UserPayload } from "../../models/UserPayload";

interface SignInRequest {
    user: User
}

@Injectable()
export class SignInUseCase {

    async execute({user}: SignInRequest) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt.toJSON(),
        };
    }
}