import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        return this.authService.signUp(authCredentialsDTO);
    }
    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDTO);
    }
}
