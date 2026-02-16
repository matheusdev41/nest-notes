import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "src/modules/user/userCases/createUserUseCase/createUserUseCase";

@Module({
    controllers: [UserController],
    providers: [CreateUserUseCase]
})
export class UserModule{}