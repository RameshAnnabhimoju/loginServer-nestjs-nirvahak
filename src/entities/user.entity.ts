import { Entity, ObjectID, ObjectIdColumn, Column, Unique } from "typeorm";
@Entity()
@Unique(['email'])
export class User {
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