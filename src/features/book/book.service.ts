import { Injectable, Param, Body } from "@nestjs/common";
import { IBook } from "src/shared/book.interface";
import { Book } from "src/shared/book.domain";
import * as mongoose from 'mongoose'
import { library } from "src/shared/db";
import { EILSEQ } from "constants";


@Injectable()
export class BookService {
    getBook(_id: string): IBook {
         library.find(book => book._id ===_id);
         return;
    }
    getBooks(limit: number, title: string, author: string){
        //need clbfunction 
     
     
     
     
     
     
     
    
        /* if (title || author){
            return library.filter(b =>{                
                if ((title == b.title && (b)) || (author == b.author))
                return b;
            }     
       )};*/

      /*return library.filter(l => {
          if ((title && title === l.title) && (author && author === l.author)) {
           
          }
      });*/
        if (limit){
            return library.filter((value, index) => {
                if (index < limit) {
                    return value;
                }
            });
        }
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
