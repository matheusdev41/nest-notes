import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserBody{
    @IsString({ message: 'O campo email precisa ser no formato texto.' })
    @IsEmail({}, {message: 'insira um email válido'})
    @IsNotEmpty({ message: 'O campo email é obrigatório' })
    email: string;

    @IsString({ message: 'O campo nome precisa ser no formato texto' })
    @IsNotEmpty({ message: 'O campo name é obrigatório' })
    name: string;

    @IsString({ message: 'O campo password precisar ser no formato texto' })
    @IsNotEmpty({ message: 'O campo password é obrigatório' })
    @MinLength(6)
    password: string;
}