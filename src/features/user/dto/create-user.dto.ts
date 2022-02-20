import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 32, {
    message: 'Имя пользователя должно быть не менее 2 символов',
  })
  username: string;

  @IsEmail(undefined, { message: 'Не правильная почта!' })
  email: string;

  @Length(6, 32, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;
}
