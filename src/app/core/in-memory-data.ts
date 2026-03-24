import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books: Book[] = [
      {
        id: 1,
        title: 'Web Basics',
        author: 'Lina Park',
        genre: 'Coding',
        year: 2025,
        description: 'A simple book about web pages, structure, and styling for beginners.',
        imageUrl: '/assets/covers/web-basics.png'
      },
      {
        id: 2,
        title: 'Angular Guide',
        author: 'Maya Cole',
        genre: 'Coding',
        year: 2024,
        description: 'An easy introduction to Angular components, routing, and services.',
        imageUrl: '/assets/covers/angular-guide.png'
      },
      {
        id: 3,
        title: 'Business Notes',
        author: 'Owen Blake',
        genre: 'Business',
        year: 2023,
        description: 'A beginner-friendly look at pricing, customers, and simple business decisions.',
        imageUrl: '/assets/covers/business-notes.png'
      },
      {
        id: 4,
        title: 'History Paths',
        author: 'Ethan Ross',
        genre: 'History',
        year: 2019,
        description: 'A short history book about travel, choices, and important events.',
        imageUrl: '/assets/covers/history-paths.png'
      },
      {
        id: 5,
        title: 'Study Skills',
        author: 'Nora Lee',
        genre: 'Education',
        year: 2022,
        description: 'Helpful study methods for focus, planning, and better learning habits.',
        imageUrl: '/assets/covers/study-skills.png'
      },
      {
        id: 6,
        title: 'Story Tales',
        author: 'Sara Rowan',
        genre: 'Fiction',
        year: 2021,
        description: 'A simple fiction story with mystery, friendship, and adventure.',
        imageUrl: '/assets/covers/story-tales.png'
      },
      {
        id: 7,
        title: 'Space Journey',
        author: 'Jonas Reed',
        genre: 'Science',
        year: 2020,
        description: 'An easy read about planets, space travel, and discovery.',
        imageUrl: '/assets/covers/space-journey.png'
      },
      {
        id: 8,
        title: 'Food Ideas',
        author: 'Rami Noor',
        genre: 'Lifestyle',
        year: 2021,
        description: 'Simple food ideas, planning tips, and kitchen basics.',
        imageUrl: '/assets/covers/food-ideas.png'
      },
    ];

    return { books };
  }

  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
  }
}
