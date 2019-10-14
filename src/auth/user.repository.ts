import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
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
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
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
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}