import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as uuid from 'uuid';
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        const { username, password, email } = authCredentialsDTO;
        const user = new User();

        user.id = uuid();
        user.email = email;
        user.username = username;
        user.password = password;

        try {
            // save user di database
            await user.save();
        } catch (err) {
            if (err.code === '23505') {// Duplicate username or email
                throw new ConflictException(err.detail);
            } else {
                throw new InternalServerErrorException();
            }
        }
        return user;
    }
}