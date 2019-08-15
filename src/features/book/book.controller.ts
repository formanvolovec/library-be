import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { BookService } from "./book.service";
import { IBook } from "src/shared/book.interface";
import { get } from "https";


@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }
    @Get(':id')
    getBook(@Param('id') id: string)
     {
        return this.bookService.getBook(id);
    }
    @Get()
    getBooks(){
        return this.bookService.getBooks();
    }
    @Post()
    createBook(@Body('book') book: IBook){
        return this.bookService.createBook(book);
    }
    @Put(':id')
    updateBook(@Param('id') _id: string, @Body('book') book:IBook) {
        console.log('hi')
        return this.bookService.updateBook(book);
    }
    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        return this.bookService.deleteBook(id);
    }
}