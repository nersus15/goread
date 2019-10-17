import { Entity, BaseEntity, PrimaryColumn, Timestamp, CreateDateColumn, Column, ManyToOne } from "typeorm";
import { User } from "../auth/user.entity";


@Entity()
export class Artikel extends BaseEntity {
    @PrimaryColumn()
    id: String;
    @Column()
    title: String;
    @Column()
    content: String;
    @Column()
    category: String;
    @Column()
    status: String;
    @ManyToOne(type => User, user => user.artikels, { eager: false })
    creator: User;
    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;
    @CreateDateColumn({ type: 'timestamp' })
    updateAt: Date;

}