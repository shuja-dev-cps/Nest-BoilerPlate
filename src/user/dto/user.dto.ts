import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly role?: string;
}
export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsString()
  readonly password: string;
  @IsOptional()
  @IsString()
  readonly name: string;
}
