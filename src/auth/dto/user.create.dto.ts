import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRegisterDto{
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}