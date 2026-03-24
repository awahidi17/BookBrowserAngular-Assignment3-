import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookService } from '../../core/book';
import { BookStore } from '../../core/book-store';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss'
})
export class BooksListComponent implements OnInit {
  private bookService = inject(BookService);
  readonly store = inject(BookStore);

  books = signal<Book[]>([]);
  loading = signal(true);
  error = signal('');

  filteredBooks = computed(() => {
    const searchTerm = this.store.searchTerm().trim().toLowerCase();
    const sortBy = this.store.sortBy();
    const favoritesOnly = this.store.showFavoritesOnly();

    return [...this.books()]
      .filter((book) => {
        const matchesSearch =
          !searchTerm ||
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.genre.toLowerCase().includes(searchTerm);

        const matchesFavorite = !favoritesOnly || this.store.isFavorite(book.id);
        return matchesSearch && matchesFavorite;
      })
      .sort((a, b) => {
        if (sortBy === 'year') {
          return b.year - a.year;
        }

        return a[sortBy].localeCompare(b[sortBy]);
      });
  });

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading.set(true);
    this.error.set('');

    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Could not load books.');
        this.loading.set(false);
      }
    });
  }

  onSearchChange(value: string): void {
    this.store.setSearchTerm(value);
  }

  onSortChange(value: string): void {
    if (value === 'title' || value === 'author' || value === 'year') {
      this.store.setSortBy(value);
    }
  }

  toggleFavorite(bookId: number): void {
    this.store.toggleFavorite(bookId);
  }

  trackByBookId(_: number, book: Book): number {
    return book.id;
  }
}
