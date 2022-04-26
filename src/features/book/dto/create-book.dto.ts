import { IsInt, IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from "class-transformer";

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @Length(2, 150, {
    message: 'Book title must be at least 2 characters',
  })
  title: string;

  @ApiProperty()
  @IsString()
  @Length(2, 65, {
    message: 'Name must be at least 2 characters',
  })
  authorName: string;

  @ApiProperty()
  @IsString()
  @Length(2, 32, {
    message: 'Genre must be at least 2 characters',
  })
  genre: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  date: number;

  @ApiProperty()
  @IsString()
  @Length(10, 2000, { message: 'Description must be at least 10 characters' })
  description: string;
}
