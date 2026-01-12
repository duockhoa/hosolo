import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  createdAt: Date;
  @IsNotEmpty()
  updatedAt: Date;
}
