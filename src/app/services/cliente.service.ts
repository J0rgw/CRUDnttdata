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

  private getHeaders(contentType = true): HttpHeaders {
    let headers = new HttpHeaders({
      'X-Group-Id': this.groupId.toString()
    });
    if (contentType) {
      headers = headers.set('Content-Type', 'application/json');
    }
    return headers;
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl, {headers: this.getHeaders(false)});
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente, {headers: this.getHeaders()});
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`, {headers: this.getHeaders(false)});
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente, {headers: this.getHeaders()});
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {headers: this.getHeaders(false)});
  }
}
