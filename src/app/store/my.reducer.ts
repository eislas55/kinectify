import { createReducer, on } from '@ngrx/store';
import { setBookAction } from './my.actions';

export interface BookState {
    _id: number;
    title: string;
    isbn: string;
    pageCount: number;
    publishedDate: {
        $date: string
    };
    thumbnailUrl: string;
    shortDescription: string;
    longDescription: string;
    status: string;
    authors: string[];
    categories: string[];
}

export const initialState: BookState = {
    _id: 0,
    title: '',
    isbn: '',
    pageCount: 0,
    publishedDate: {
        $date: ''
    },
    thumbnailUrl: '',
    shortDescription: '',
    longDescription: '',
    status: '',
    authors: [],
    categories: [],
};

export const bookReducer = createReducer(
    initialState,
    on(setBookAction, (state, book) => ({ ...state, ...book }))
);