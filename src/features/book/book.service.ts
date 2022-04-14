import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { SearchBookDto } from './dto/search-book.dto';
import { FileService, FileType } from '../../shared/file/file.service';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private fileService: FileService,
  ) {}

  async create(createBookDto: CreateBookDto, picture) {
    const book = await this.bookRepository.create(createBookDto);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    this.logger.log(`Book: ${book.title} successfully created`);
    return this.bookRepository.save({ ...createBookDto, picture: picturePath });
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
    this.logger.log(`Updating book ${updateBookDto.title}`);
    const find = await this.bookRepository.findOne(+id);

    if (!find) {
      this.logger.error(`No book found, to update`);
      throw new NotFoundException('No book found!');
    }
    return this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    this.logger.log(`Book ${id} has be deleted`);
    const find = await this.bookRepository.findOne(+id);

    if (!find) {
      this.logger.error(`No book found, to delete`);
      throw new NotFoundException('No book found!');
    }
    return this.bookRepository.delete(+id);
  }
}
