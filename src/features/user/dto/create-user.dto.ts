import { IsEmail, Length } from 'class-validator';
import { UniqueOnDatabase } from '../../auth/validations/UniqueValidation';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @Length(2, 32, {
    message: 'Имя пользователя должно быть не менее 2 символов',
  })
  username: string;

  @IsEmail(undefined, { message: 'Не правильная почта!' })
  @UniqueOnDatabase(UserEntity, {
    message: 'Такая почта уже есть',
  })
  email: string;

  @Length(6, 32, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;
}
