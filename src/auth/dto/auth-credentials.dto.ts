import { IsNotEmpty, IsEmail, IsString, MinLength } from "class-validator";

export class AuthCredentialsDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}