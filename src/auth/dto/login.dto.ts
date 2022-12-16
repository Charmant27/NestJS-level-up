/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

/* eslint-disable prettier/prettier */
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  adminID: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
