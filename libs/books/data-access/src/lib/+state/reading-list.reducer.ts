import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
  isRemovedFromReadingListSuccess:boolean;
  isAddedToReadingListSuccess:boolean;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null,
  isRemovedFromReadingListSuccess:false,
  isAddedToReadingListSuccess:false
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.init, state => {
    return {
      ...state,
      loaded: false,
      error: null,
      isRemovedFromReadingListSuccess:false,
      isAddedToReadingListSuccess:false
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ReadingListActions.confirmedAddToReadingList, (state, action) =>{
    return  readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, {
      ...state,
      isAddedToReadingListSuccess:true
    }) 
  }),
  on(ReadingListActions.failedAddToReadingList, (state, action) =>{
    return {
      ...state,
      isAddedToReadingListSuccess:false
    };
  }),
  on(ReadingListActions.confirmedRemoveFromReadingList, (state, action) =>{
    return readingListAdapter.removeOne(action.item.bookId, {
      ...state,
      isRemovedFromReadingListSuccess:true
    });
  }),
  on(ReadingListActions.failedRemoveFromReadingList, (state, action) =>{
    return {
      ...state,
      isRemovedFromReadingListSuccess:false
    };
  })
  
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
