import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase/createUserUseCase";
import { CreateUserBody } from "./dtos/CreateUserBody";
import { UserViewModel } from "./viewModel/userViewModel";

@Controller('users')
export class UserController {
  constructor(private createUserUsercase: CreateUserUseCase) {}

  @Post()
  async createPost(@Body() body: CreateUserBody) {
    const {email, name, password}  = body

    const user = await this.createUserUsercase.execute({
      email, 
      name, 
      password
    });

    return UserViewModel.toHttp(user);
  }
}