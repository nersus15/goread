import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }
    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        return this.userRepository.signUp(authCredentialsDTO);
    }
    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        return this.userRepository.validateUserPassword(authCredentialsDTO);
    }


}
