import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURL = 'http://localhost:5000/api/Evento';
  tokenHeader: HttpHeaders;
  constructor(private http: HttpClient) { this.tokenHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('Token')}`});}

  getAllEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL, { headers : this.tokenHeader});
  }
  getEventoByTema(tema: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/getByTema/${tema}`, { headers : this.tokenHeader});
  }
  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/getById/${id}`, { headers : this.tokenHeader});
  }
  postEvento(evento: Evento){
    return this.http.post(this.baseURL, evento, { headers : this.tokenHeader});
  }
  postUpload(file: File, name: string){
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, name);
    return this.http.post(`${this.baseURL}/upload/`, formData, { headers : this.tokenHeader});
  }
  putEvento(evento: Evento){
    console.log(evento);
    return this.http.put(`${this.baseURL}/${evento.id}`, evento, { headers : this.tokenHeader});
  }
  deleteEvento(id: number){
    return this.http.delete(`${this.baseURL}/${id}`, { headers : this.tokenHeader});
  }
}
