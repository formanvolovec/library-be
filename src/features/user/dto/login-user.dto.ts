import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Не правильная почта!' })
  email: string;

  @IsString()
  @Length(6, 32, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;
}
