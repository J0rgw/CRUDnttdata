import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = "https://clients-example-api.fly.dev/api/clients";
  private groupId = "2";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'X-Group-Id': this.groupId.toString(),
    'Content-Type': 'application/json'
  });
}

  getClientes(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this.apiUrl, {headers: this.getHeaders()});
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente, {headers: this.getHeaders()});
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`, {headers: this.getHeaders()});
  }

  updateCliente(id: number, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cliente, {headers: this.getHeaders()});
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {headers: this.getHeaders()});
  }
}
