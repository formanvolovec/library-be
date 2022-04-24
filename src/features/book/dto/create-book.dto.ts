import { IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @Length(2, 150, {
    message: 'Название книги должно быть не менее 2 символов',
  })
  title: string;

  @IsString()
  @ApiProperty()
  @Length(2, 65, {
    message: ' Имя должно быть не менее 2 символов',
  })
  authorName: string;

  @IsString()
  @ApiProperty()
  @Length(2, 32, {
    message: 'Жанр должнен быть не менее 2 символов',
  })
  genre: string;

  @IsNumber()
  @ApiProperty()
  date: number;

  @IsString()
  @ApiProperty()
  @Length(10, 2000, { message: 'Описание должно быть не менее 10 символов' })
  description: string;
}
