import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ValidateUseUserCase } from "../useCases/validateUserUseCase/validateUserUseCase";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private validateUserUseCase: ValidateUseUserCase) {
        super({
            usernameField: 'email',
        });
    };

    async validate(email: string, password: string) {
      return await this.validateUserUseCase.execute({
        email,
        password,
      });
    };
}