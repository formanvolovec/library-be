import { Controller, Get, Param, Post, Body, Put, Delete, Query } from "@nestjs/common";
import { BookService } from "./book.service";
import { IBook } from "src/shared/book.interface";
import { get } from "https";
import { request } from "http";
import { library } from "src/shared/db";
import { Book } from "src/shared/book.domain";
import { response } from "express";


@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }
    @Get(':id')
    getBook(@Param('id') id: string){
        return this.bookService.getBook(id);
    }
    @Get()
    getBooks(@Query('limit') limit: number, @Query('title') title: string, @Query('author') author: string){
        return this.bookService.getBooks(limit,title,author);
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