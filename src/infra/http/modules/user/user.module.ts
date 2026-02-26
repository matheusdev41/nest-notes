import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase/createUserUseCase";
import { DatabaseModule } from "src/infra/database/database.module";
import { ValidateUseUserCase } from "src/modules/auth/useCases/validateUserUseCase/validateUserUseCase";

@Module({
    imports:[DatabaseModule],
    controllers: [UserController],
    providers: [
      CreateUserUseCase,
      ValidateUseUserCase,
    ],
    exports: [ValidateUseUserCase],
})
export class UserModule{}