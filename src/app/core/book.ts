import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, NewBook } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private api = 'api/books';

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.api);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.api}/${id}`);
  }

  addBook(book: NewBook): Observable<Book> {
    return this.http.post<Book>(this.api, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.api}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<unknown> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
