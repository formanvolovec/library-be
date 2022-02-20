import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { SearchBookDto } from './dto/search-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find({
      order: { createAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const find = await this.bookRepository.findOne(+id);

    if (!find) {
      throw new NotFoundException('Книга не найдена!');
    }
    return find;
  }

  async search(searchBookDto: SearchBookDto) {
    const qb = this.bookRepository.createQueryBuilder('b');
    if (searchBookDto.title) {
      qb.andWhere(`b.title ILIKE :title`);
    }
    if (searchBookDto.authorName) {
      qb.andWhere(`b.authorName ILIKE :authorName`);
    }
    if (searchBookDto.genre) {
      qb.andWhere(`b.genre ILIKE :genre`);
    }
    qb.setParameters({
      title: `%${searchBookDto.title}%`,
      authorName: `%${searchBookDto.authorName}`,
      genre: `%${searchBookDto.genre}`,
    });
    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async update(id: number, createBookDto: UpdateBookDto) {
    const find = await this.bookRepository.findOne(+id);

    if (!find) {
      throw new NotFoundException('Книга не найдена!');
    }
    return this.bookRepository.update(id, createBookDto);
  }

  async remove(id: number) {
    const find = await this.bookRepository.findOne(+id);

    if (!find) {
      throw new NotFoundException('Книга не найдена!');
    }
    return this.bookRepository.delete(+id);
  }
}
