import { Injectable } from '@nestjs/common';
import {  BookDTO } from './book.dto';

let bookStore:  BookDTO[] = [
  {
    id: 'Book_1',
    title: 'LOTR',
    author: 'JRRT',
    release_date: new Date('1954-06-26')
  },
  {
    id: 'Book_2',
    title: 'HP',
    author: 'JKR',
    release_date: new Date('1997-06-26')
  },
  {
    id: 'Book_3',
    title: 'TGG',
    author: 'FSF',
    release_date: new Date('1925-06-26')
  }
  ,
  {
    id: 'Book_4',
    title: 'TKAMB',
    author: 'HL',
    release_date: new Date('1960-06-26')
  }
]

//  AppService is annotated as @Injectable
//  because Nest will inject it into Client/whatever controller
//  without us having to do anything special.
@Injectable()
export class AppService {

  getBookByID(bookID: string) {
    return bookStore.find( (b:  BookDTO) => b.id == bookID)
  }

  getAllBooks() {
    return bookStore;
  }

  newBook(book:   BookDTO) {
    const exists = bookStore.find( (b:   BookDTO) => {
      return b.title == book.title &&
          b.author == book.author &&
          b.release_date == book.release_date
    })
    if(exists) return false;
    book.id = "Book_" + (bookStore.length + 1)
    bookStore.push(book)
    return book.id;
  }
}