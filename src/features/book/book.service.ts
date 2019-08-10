import { Injectable } from "@nestjs/common";
import { IBook } from "src/shared/book.interface";
import { Book } from "src/shared/book.domain";
import * as mongoose from 'mongoose'
import { libary } from "src/shared/db";

@Injectable()
export class BookService {
    getBook(_id: string): IBook {
        return libary.find(book => book._id === _id);
        // return Book.findOne({ author: 'Meleshko'}).exec();
    }
    createBook(book: IBook): IBook {
        return;
    }
    updateBook(book: IBook): Promise<IBook> {
        return;
    }
    deleteBook(_id: string): Promise<IBook> {
        return;
    }
}
