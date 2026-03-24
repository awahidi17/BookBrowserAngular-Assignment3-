import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../core/book';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.scss'
})
export class EditBookComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  bookId = 0;
  loading = signal(true);
  error = signal('');

  bookForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required, Validators.minLength(2)]],
    genre: ['', [Validators.required, Validators.minLength(2)]],
    year: [2026, [Validators.required, Validators.min(1000), Validators.max(2100)]],
    imageUrl: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(15)]]
  });

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isFinite(this.bookId)) {
      this.error.set('Invalid book id.');
      this.loading.set(false);
      return;
    }

    this.bookService.getBook(this.bookId).subscribe({
      next: (book) => {
        this.bookForm.patchValue(book);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Could not load the book for editing.');
        this.loading.set(false);
      }
    });
  }

  submit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.bookService
      .updateBook({
        id: this.bookId,
        ...this.bookForm.getRawValue()
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/books', this.bookId]);
        },
        error: (err) => {
          console.error(err);
          this.error.set('Could not update the book.');
        }
      });
  }
}
