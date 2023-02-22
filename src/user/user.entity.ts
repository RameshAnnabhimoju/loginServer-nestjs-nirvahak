import { Entity, ObjectID, ObjectIdColumn, Column, Unique, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    city: string;

    @Column()
    email: string;

    @Column()
    password: string;
}