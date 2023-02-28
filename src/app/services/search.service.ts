import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiService} from "./api.service";
import {map} from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private itemsSubject = new BehaviorSubject<any[]>([]);
  public items$: Observable<any[]> = this.itemsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
  }

  search(pageNumber: number, pageSize: number, filter: string) {

    let queryParams = new HttpParams()
      .set('filter', filter)
      .set('page[number]', pageNumber)
      .set('page[size]', pageSize)
      .set('fields[items]', 'title,caption,date')

    return this.http.get<any>(this.apiService.MOMAPIX_API_ENDPOINT + 'search', {params: queryParams}).pipe(map(response => response['data']))
  }

  updateItems(items: any[]) {
    this.itemsSubject.next(items);
  }
}
