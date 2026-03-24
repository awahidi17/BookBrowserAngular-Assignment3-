import { Injectable, computed, signal } from '@angular/core';
import { SortOption } from '../models/book.model';

const FAVORITES_KEY = 'book-browser-favorites';

@Injectable({
  providedIn: 'root'
})
export class BookStore {
  selectedBookId = signal<number | null>(null);
  favoriteIds = signal<number[]>(this.loadFavorites());
  favoriteCount = computed(() => this.favoriteIds().length);
  searchTerm = signal('');
  sortBy = signal<SortOption>('title');
  showFavoritesOnly = signal(false);

  setSelectedBookId(id: number | null): void {
    this.selectedBookId.set(id);
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  setSortBy(value: SortOption): void {
    this.sortBy.set(value);
  }

  toggleFavoritesOnly(): void {
    this.showFavoritesOnly.update((value) => !value);
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().includes(id);
  }

  toggleFavorite(id: number): void {
    this.favoriteIds.update((ids) => {
      const updated = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  removeFavorite(id: number): void {
    if (!this.isFavorite(id)) {
      return;
    }

    this.favoriteIds.update((ids) => {
      const updated = ids.filter((item) => item !== id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  private loadFavorites(): number[] {
    const raw = localStorage.getItem(FAVORITES_KEY);

    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((value) => typeof value === 'number') : [];
    } catch {
      return [];
    }
  }
}
