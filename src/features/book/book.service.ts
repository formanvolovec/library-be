import { Injectable, Param, Body } from "@nestjs/common";
import { IBook } from "src/shared/book.interface";
import { Book } from "src/shared/book.domain";
import * as mongoose from 'mongoose'
import { library } from "src/shared/db";


@Injectable()
export class BookService {
    getBook(_id: string): IBook {
         library.find(book => book._id ===_id);
         return;
        // return Book.findOne({ author: 'Bykov'}).exec();
    }
    getBooks(){
        return library;
    }
    createBook(book: IBook): IBook[] {
        library.push(book as any);  
        return library;  
    }
    updateBook(book: IBook): IBook[]{
        
        return library.map(b => {
        
            if (b._id === book._id){
                b.title = book.title 
                b.author = book.author
            }
            return book;
        })
    }
    deleteBook(_id: string): IBook[] {
        return library.filter(book => book._id !==_id);
    }
}
