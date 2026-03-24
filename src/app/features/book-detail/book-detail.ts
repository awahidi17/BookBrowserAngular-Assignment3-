import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../core/book';
import { BookStore } from '../../core/book-store';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss'
})
export class BookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  readonly store = inject(BookStore);

  book = signal<Book | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isFinite(id)) {
      this.error.set('Invalid book id.');
      this.loading.set(false);
      return;
    }

    this.store.setSelectedBookId(id);
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.book.set(book);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Could not load the selected book.');
        this.loading.set(false);
      }
    });
  }

  toggleFavorite(): void {
    const currentBook = this.book();
    if (!currentBook) {
      return;
    }

    this.store.toggleFavorite(currentBook.id);
  }

  deleteBook(): void {
    const currentBook = this.book();
    if (!currentBook) {
      return;
    }

    const confirmed = window.confirm(`Delete "${currentBook.title}" from the catalog?`);
    if (!confirmed) {
      return;
    }

    this.bookService.deleteBook(currentBook.id).subscribe({
      next: () => {
        this.store.removeFavorite(currentBook.id);
        this.router.navigate(['/books']);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Could not delete the selected book.');
      }
    });
  }
}
