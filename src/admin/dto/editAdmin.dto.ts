/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditAdmin {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
