import { Entity, ObjectID, ObjectIdColumn, Column, Unique, PrimaryGeneratedColumn, Generated } from "typeorm";

@Entity({ name: 'users' })
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    @Generated('uuid')
    @ObjectIdColumn()
    _id: ObjectID;

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