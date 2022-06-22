import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../account/account';
import { Movement } from './movement';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllMovements(): Observable<Movement[]> {
    return this.http.get<Movement[]>(`${this.apiServerUrl}/api/movement`);
  }

  public addMovement(movement: Movement): Observable<Account> {
    return this.http.post<Account>(`${this.apiServerUrl}/api/movement`, movement);
  }

  public deleteMovement(id: number): Observable<{}>{
    return this.http.delete(`${this.apiServerUrl}/api/movement/${id}`, {responseType: 'text'});
  }
}
