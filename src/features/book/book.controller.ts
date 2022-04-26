import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '../../shared/enums/role.enum';
import { BookEntity } from './entities/book.entity';
import { Roles } from '../../shared/decorators/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('book')
@ApiTags('books')
@ApiBearerAuth()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create', description: 'Created new book' })
  @ApiParam({ name: 'role', type: 'string', enum: Role })
  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({ type: BookEntity })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('/add')
  @UseInterceptors(FileInterceptor('picture'))
  create(@UploadedFile() file, @Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto, file.buffer);
  }

  @ApiOperation({ summary: 'Search books by parameters' })
  @Get('/')
  searchBook(@Query() searchBookDto: SearchBookDto) {
    return this.bookService.search(searchBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Search book by ID' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update book' })
  @ApiBody({ type: BookEntity })
  @ApiParam({ name: 'id', required: true })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Remove book by id' })
  @ApiOkResponse({ type: BookEntity })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
