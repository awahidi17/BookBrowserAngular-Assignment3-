export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: string;
  year: number;
  imageUrl: string;
}

export type NewBook = Omit<Book, 'id'>;
export type SortOption = 'title' | 'author' | 'year';
