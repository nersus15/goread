import { BaseEntity, Entity, PrimaryColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Artikel } from "../artikels/artikel.entity";

@Entity()
@Unique(['email'])
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryColumn()
    id: string;
    @Column()
    email: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    salt: string;
    @OneToMany(type => Artikel, artikel => artikel.creator, { eager: true })
    artikels: Artikel[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}