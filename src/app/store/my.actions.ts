import { createAction, props } from '@ngrx/store';
import { BookState } from 'src/app/store/my.reducer';

export const setBookAction = createAction(
    '[Book] Set Book',
    props<BookState>()
  );