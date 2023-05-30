import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { bookModel } from '../../models/book-response.model';
const books = require('../../shared/amazon.books.json');
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.scss'],
})
export class BookReaderComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor() { }
  
  showFiller = false;
  data: bookModel[] = books;
  filteredItems: bookModel[] = this.data;
  searchTerm: string = '';
  itemShowed: any = '';
  
  ngOnInit(): void {
    console.log(this.data);
  }

  toggleDrawer(item: any): void {
    if(!this.showFiller || this.itemShowed?.title == item.title) this.drawer.toggle();
    this.itemShowed = item;
  }
  drop( event: CdkDragDrop<string[]> ): void {
    console.log(event);
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
  
  filterSearch(searchTerm: string): void {
    this.filteredItems = this.data.filter( item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}