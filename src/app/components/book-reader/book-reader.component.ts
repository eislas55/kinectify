import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
/* NGRX */
import { Store } from '@ngrx/store';
import { BookState } from 'src/app/store/my.reducer';
import { setBookAction } from '../../store/my.actions';
const books = require('../../shared/amazon.books.json');

@Component({
  selector: 'book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.scss'],
})
export class BookReaderComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  
  book: BookState = {
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
    categories: []
  };

  constructor(
    private store: Store<{ bookState: BookState }>
  ) {
    this.store.select('bookState').subscribe((state) => {
      this.book = state;
    });
  }
  
  showFiller = false;
  data: BookState[] = books;
  filteredItems: BookState[] = this.data;
  searchTerm: string = '';
  
  ngOnInit(): void {
    //console.log(this.data);
    console.log("==============================================================");
    console.log("Agregué a la funcionalidad que cuando se dé click sobre un elemento ya desplegado solamente se actualice la información, en lugar de cerrar de nuevo el menú lateral. Si se da click en el mismo elemento, entonces si se cierra.");
    console.log("==============================================================");
  }

  toggleDrawer(item: any): void {
    if(!this.showFiller || this.book?.title == item.title) this.drawer.toggle();
    this.setBookData(item);
  }
  drop( event: CdkDragDrop<string[]> ): void {
    //console.log(event);
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
  
  filterSearch(searchTerm: string): void {
    this.filteredItems = this.data.filter( item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  setBookData(item: BookState): void {
    this.store.dispatch(setBookAction( item ));
  }
}