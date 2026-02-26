import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInBody {
    @IsNotEmpty({ message: 'O email é obrigatório' })
    @IsString({ message: 'O email precisa ser do tipo texto' })
    @IsEmail({}, { message: 'Precisa ser um email válido' })
    email: string;

    @IsString({ message: 'A senha precisa ser do tipo texto' })
    @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres'})
    password: string;
}