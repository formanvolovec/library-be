import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { BookService } from "./book.service";


@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }
    @Get(':id')
    getBook(@Param('id') id: string) {
        return this.bookService.getBook(id);
    }
    @Post()
    createBook(@Body('book') book: { title: string, author: string }) {
        return this.bookService.createBook(book);
    }
}