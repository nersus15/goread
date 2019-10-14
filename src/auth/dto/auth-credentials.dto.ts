import { IsNotEmpty, IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class AuthCredentialsDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsOptional()
    @IsString()
    @MinLength(3)
    username: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}