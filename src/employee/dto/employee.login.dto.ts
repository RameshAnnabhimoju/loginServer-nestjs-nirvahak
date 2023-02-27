import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class employeeLoginDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 18)
    password: string
}