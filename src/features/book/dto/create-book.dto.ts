import { Length } from 'class-validator';

export class CreateBookDto {
  @Length(2, 150, {
    message: 'Название книги должно быть не менее 2 символов',
  })
  title: string;

  @Length(2, 65, {
    message: ' Имя должно быть не менее 2 символов',
  })
  authorName: string;

  @Length(2, 32, {
    message: 'Жанр должнен быть не менее 2 символов',
  })
  genre: string;

  date: number;

  @Length(10, 2000, { message: 'Описание должно быть не менее 10 символов' })
  description: string;
}
