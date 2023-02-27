import { Column, Entity, Generated, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'employees' })
@Unique(['email'])
export class Employee {

    @PrimaryGeneratedColumn()
    @Generated('uuid')
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    dob: Date;

    @Column()
    city: string;

    @Column()
    mobile: number;

    @Column()
    email: string;

    @Column()
    password: string;
}