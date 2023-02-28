import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from "class-validator";

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
    @IsDateString()
    dob: Date;

    @IsNotEmpty()
    @IsString()
    @Length(3, 25)
    city: string;

    @IsNotEmpty()
    @IsString()
    @Length(10)
    mobile: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 18)
    password: string
}