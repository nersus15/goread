import { Entity, BaseEntity, PrimaryColumn, Timestamp, CreateDateColumn, Column } from "typeorm";

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
    @Column()
    creator: String;
    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;
    @CreateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}