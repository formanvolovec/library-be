import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from "typeorm";

export class CreateBookDto {
  @ApiProperty()
  @Length(2, 150, {
    message: 'Название книги должно быть не менее 2 символов',
  })
  title: string;

  @ApiProperty()
  @Length(2, 65, {
    message: ' Имя должно быть не менее 2 символов',
  })
  authorName: string;

  @ApiProperty()
  @Length(2, 32, {
    message: 'Жанр должнен быть не менее 2 символов',
  })
  genre: string;

  @ApiProperty()
  date: number;

  @ApiProperty()
  picture: string;

  @ApiProperty()
  @Length(10, 2000, { message: 'Описание должно быть не менее 10 символов' })
  description: string;
}
