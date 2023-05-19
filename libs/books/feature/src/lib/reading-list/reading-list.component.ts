import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  public componentDestroyed$ = new Subject();
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    const bookAddedSnackbar = this.snackBar.open('Book Removed from Reading List', 'Undo',{
      duration:2000
    });
    bookAddedSnackbar.onAction().pipe(takeUntil(this.componentDestroyed$)).subscribe(() => {
      const book:Book=item;
      this.store.dispatch(addToReadingList({ book }));
    });
    this.store.dispatch(removeFromReadingList({ item }));
  }

  ngOnDestroy(){
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }
}
