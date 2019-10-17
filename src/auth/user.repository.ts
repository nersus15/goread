import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException, NotFoundException, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { IsEmpty } from "class-validator";
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        const { username, password, email } = authCredentialsDTO;
        const user = new User();

        if (!username) {
            user.username = email;
        } else {
            user.username = username;
        }
        user.id = uuid();
        user.email = email;

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

    async validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        const { email, password } = authCredentialsDTO;
        const user = await this.findOne({ email });

        if (user) {
            if (await user.validatePassword(password)) {
                return user;
            } else {
                throw new UnauthorizedException("Invalid password");
            }
        } else {
            throw new UnauthorizedException(`User with email: "${email}" was Not found`);
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}