import { Routes } from '@angular/router';
import { AddBookComponent } from './features/add-book/add-book';
import { BookDetailComponent } from './features/book-detail/book-detail';
import { BooksListComponent } from './features/books-list/books-list';
import { EditBookComponent } from './features/edit-book/edit-book';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksListComponent },
  { path: 'books/new', component: AddBookComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'books/:id/edit', component: EditBookComponent },
  { path: '**', redirectTo: 'books' }
];
