import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  constructor(private http: HttpClient) {}

  public get = (route: string): Observable<any> => {
    return this.http.get(route);
  };

  public post = (route: string, body: any): Observable<any> => {
    return this.http.post(route, body);
  };

  public put = (route: string, body: any): Observable<any> => {
    return this.http.put(route, body);
  };

  public delete = (route: string): Observable<any> => {
    return this.http.delete(route);
  };
}
