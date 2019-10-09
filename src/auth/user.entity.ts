import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
}