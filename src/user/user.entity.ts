import { Entity, ObjectID, ObjectIdColumn, Column, Unique, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
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