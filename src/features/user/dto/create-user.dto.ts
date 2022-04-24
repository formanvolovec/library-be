import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(2, 32, {
    message: 'Имя пользователя должно быть не менее 2 символов',
  })
  username: string;

  @ApiProperty()
  @IsEmail(undefined, { message: 'Не правильная почта!' })
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 32, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;
}
