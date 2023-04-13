import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsDataService {
  _url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getIngredients(){
    return this.http.get(this._url+'ingredients')
  }
}
