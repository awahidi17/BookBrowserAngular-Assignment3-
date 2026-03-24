import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../core/book';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-book.html',
  styleUrl: './add-book.scss'
})
export class AddBookComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private bookService = inject(BookService);

  error = '';

  bookForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required, Validators.minLength(2)]],
    genre: ['', [Validators.required, Validators.minLength(2)]],
    year: [2026, [Validators.required, Validators.min(1000), Validators.max(2100)]],
    imageUrl: ['/assets/covers/angular-guide.png', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(15)]]
  });

  submit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.bookService.addBook(this.bookForm.getRawValue()).subscribe({
      next: (book) => {
        this.router.navigate(['/books', book.id]);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Could not add the new book.';
      }
    });
  }
}
