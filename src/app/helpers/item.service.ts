import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IBeerItem } from "../beer/beer-item"

@Injectable()
export class ItemService {
  private _beerUrl = 'https://api.punkapi.com/v2/beers';

  constructor(private _http: HttpClient) { }

  getBeerItems(): Observable<IBeerItem[]> {
    return this._http.get<IBeerItem[]>(this._beerUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
