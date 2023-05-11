import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { BookDTO } from './book.dto';

function delay(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // annotation on method specifies the command to which each method will respond
  @MessagePattern({cmd: 'new_book'})
  newBook(book: BookDTO): string{
    const result = this.appService.newBook(book);
    if(!result) {
      return "Book already exists"
    } else {
      return result;
    }
  }

  @MessagePattern({cmd: 'get_book'})
  getBook(bookID: string): BookDTO {
    return this.appService.getBookByID(bookID)
  }

  @MessagePattern({cmd: 'get_books'})
  getBooks(): BookDTO[] {
    // delay(60000);
    return this.appService.getAllBooks()
  }
}