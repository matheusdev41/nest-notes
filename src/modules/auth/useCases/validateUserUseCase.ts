import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { UserRepository } from "src/modules/user/repositories/UserRepository";

interface ValidadeUserRequest {
    email: string;
    password: string;
}

@Injectable()
export class ValidateUseUserCase {

    constructor(private UserRepository: UserRepository) {}

    async execute({ email, password }) {
        const user = await this.UserRepository.findByEmail(email)

        if(!user) 
            throw new UnauthorizedException("Email ou senha incorretos.")
        
        const isPasswordMatched = await compare(password, user.password);

        if(!isPasswordMatched)
            throw new UnauthorizedException('Email ou senha incorretos.');

        return user;
    }
}