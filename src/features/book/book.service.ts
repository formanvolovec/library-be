import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { SearchBookDto } from './dto/search-book.dto';
import { FileService } from '../../shared/file/file.service';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private fileService: FileService,
  ) {}

  async create(createBookDto: CreateBookDto, picture) {
    const book = await this.bookRepository.create({
      ...createBookDto,
      picture,
    });
    this.logger.log(`Book: ${book.title} successfully created`);
    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find({
      order: { createAt: 'DESC' },
    });
  }
  async findOne(id: number) {
    const find = await this.bookRepository.findOne(+id);
    if (!find) {
      this.logger.error(`No book found`);
      throw new NotFoundException('No book found');
    }
    return find;
  }

  async search(searchBookDto: SearchBookDto) {
    const { limit, offset, ...rest } = searchBookDto;
    const qb = this.bookRepository.createQueryBuilder('b');
    qb.limit(+searchBookDto.limit || 8);
    qb.offset(offset <= 1 ? 0 : limit * (offset - 1));
    const params = {};
    Object.keys(rest).forEach((key) => {
      qb.andWhere(`b.${key} ILIKE :${key}`);
      params[key] = `%${searchBookDto[key]}%`;
    });
    qb.setParameters(params);
    const [items, total] = await qb.getManyAndCount();
    const mappedItems = items.map((book) => {
      return { ...book, description: book.description.substring(0, 50) };
    });
    return { items: mappedItems, total };
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    console.log(updateBookDto);
    this.logger.log(`Updating book ${id}`);
    const find = await this.bookRepository.findOne(+id);
    if (!find) {
      this.logger.error(`No book found, to update`);
      throw new NotFoundException('No book found!');
    }
    return this.bookRepository.save({ ...updateBookDto, id });
  }

  async remove(id: number) {
    this.logger.log(`Book ${id} delete`);
    const find = await this.bookRepository.findOne(+id);

    if (!find) {
      this.logger.error(`No book found, to delete`);
      throw new NotFoundException('No book found!');
    }
    return this.bookRepository.delete(+id);
  }
}
