import { Injectable } from "@nestjs/common";
import { User } from "src/modules/user/entities/user.entity";
import { UserPayload } from "../../models/UserPayload";
import { JwtService } from "@nestjs/jwt";

interface SignInRequest {
    user: User
}

@Injectable()
export class SignInUseCase {
    constructor(private jtwService: JwtService) {}

    async execute({user}: SignInRequest) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt.toJSON(),
        };

        const jwtToken = this.jtwService.sign(payload);

        return jwtToken;
    }
}