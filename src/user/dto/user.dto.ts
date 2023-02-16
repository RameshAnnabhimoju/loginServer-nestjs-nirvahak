import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ObjectID } from "typeorm";

export class UserRegisterDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 25)
    name: string;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 25)
    city: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 18)
    password: string
}

export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 18)
    password: string
}