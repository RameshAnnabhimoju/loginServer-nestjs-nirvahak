import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class employeeRegisterDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 25)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 25)
    lastName: string;


    @IsNotEmpty()
    @IsDate()
    dob: Date;

    @IsNotEmpty()
    @IsString()
    @Length(3, 25)
    city: string;

    @IsNotEmpty()
    @IsNumber()
    @Length(10, 10)
    mobile: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 18)
    password: string
}