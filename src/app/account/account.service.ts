import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiServerUrl = environment.apiBaseUrl;
  public accounts: Account[] = [];


  constructor(private http: HttpClient) { }


  public getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiServerUrl}/api/account`);
  }

  public addAccount(account: Account): Observable<Account>{
    return this.http.post<Account>(`${this.apiServerUrl}/api/account`, account);
  }

  public deleteAccount(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/account/${id}`);
  }

}
