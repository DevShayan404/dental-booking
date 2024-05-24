import { Component, OnInit, ElementRef, Renderer2, ViewChild, HostListener, Input, Attribute, ViewChildren, QueryList  } from '@angular/core';

@Component({
  selector: 'app-scroll-div',
  templateUrl: './scroll-div.component.html',
  styleUrls: ['./scroll-div.component.css']
})
export class ScrollDivComponent implements OnInit {

 

  @ViewChildren('tabPanel') tabPanels: QueryList<ElementRef>;
  @ViewChildren('card') cards: QueryList<ElementRef>;
  categories = [
    {
      name: 'Category1',
      items: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
      name: 'Category2',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category3',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category4',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category5',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category6',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category7',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category8',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category9',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category10',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category11',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category12',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Categor13',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category14',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category15',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
    {
      name: 'Category16',
      items: ['Item 4', 'Item 5', 'Item 6'],
    },
  ];
  
  constructor() {
    // for (let i = 0; i < this.sum; ++i) {
    //   this.array.push(i);
    // }
   }
  ngOnInit(): void {
  }
  // scrollToCard(tabPanel: any, card: any) {
  //   tabPanel.nativeElement.addEventListener('click', () => {
  //     card.nativeElement.scrollIntoView({ behavior: 'smooth' });
  //   });
  // }

  array = [];
  sum = 100;
  
  modalIsOpen = '';
  modalTitle = 'scroll to update';
  modalBody:any;
  
  modalScrollDistance = 2;
  modalScrollThrottle = 50;


  onScrollDown () {
    console.log('scrolled!!');

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    // for (let i = start; i < this.sum; ++i) {
    //   this.array.push(i);
    // }
  }
  
  onModalScrollDown () {
    // this.modalTitle = 'updated on ' + (new Date()).toString();
    this.modalBody += this.modalText;
  }
 modalText = `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.`;
  }

