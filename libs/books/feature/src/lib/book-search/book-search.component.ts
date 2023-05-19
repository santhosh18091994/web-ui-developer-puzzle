import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit,OnDestroy {
  books: ReadingListBook[];
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  searchForm = this.fb.group({
    term: ''
  });
  public componentDestroyed$ = new Subject();

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    const searchInputChange= fromEvent(this.searchInput.nativeElement,'keyup');
    searchInputChange.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(()=>{
        this.searchBooks();
      })
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe();
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(){
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }
}
