import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email : string;
    @IsEnum(["intern" , "admin" , "ing"],{
        message:'valid role required'
    })
    role: "intern" | "admin" | "ing";
}