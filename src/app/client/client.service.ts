import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clients: Client[] = [];

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllClients(): Observable<Client[]> {

    return this.http.get<Client[]>(`${this.apiServerUrl}/api/client`);
  }

  public addClient(client: Client): Observable<Client>{
    return this.http.post<Client>(`${this.apiServerUrl}/api/client`, client);
  }

  public updateClient(client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.apiServerUrl}/api/client/update`, client);
  }

  public deleteClient(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/api/client/${id}`);
  }

}
