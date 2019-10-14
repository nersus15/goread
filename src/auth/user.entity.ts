import { BaseEntity, Entity, PrimaryColumn, Column, Unique } from "typeorm";

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
}