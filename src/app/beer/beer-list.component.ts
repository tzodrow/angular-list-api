import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';

import { IBeerItem } from './beer-item';
import { ItemService } from '../helpers/item.service';

@Component({
  selector: 'pm-beer-list',
  templateUrl: './beer-list.component.html'
})
export class BeerListComponent implements OnInit{
  itemType: string = 'Beer';
  imageWidth: number = 50;
  imageMargin: number = 2;

  _listFilter: string = "";
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBeerList = this.listFilter ? this.performFilter(this.listFilter) : this.beerList;
  }

  errorMessage: string;
  beerList: IBeerItem[];
  filteredBeerList: IBeerItem[];

  constructor(private _itemService: ItemService) {
  }

  performSort(): IBeerItem[] {
    return this.beerList.sort((a: IBeerItem, b: IBeerItem) =>
      a.name.localeCompare(b.name))
  }

  performFilter(filterBy: string): IBeerItem[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.beerList.filter((item: IBeerItem) =>
      (item.name.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        item.abv.toString().toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        item.description.toLocaleLowerCase().indexOf(filterBy) !== -1
        ));
  }

  convertToDecimal(value: number): number {
    return value / 100;
  }

  ngOnInit(): void {
    this._itemService.getBeerItems()
      .subscribe(
      items => {
        this.beerList = items;
        this.performSort();
        this.filteredBeerList = this.beerList;
      },
      error => this.errorMessage = <any>error);
  }
}
