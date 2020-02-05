import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURL = 'http://localhost:5000/api/Evento';
  constructor(private http: HttpClient) { }

  getAllEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }
  getEventoByTema(tema: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/getByTema/${tema}`);
  }
  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/getById/${id}`);
  }
  postEvento(evento: Evento){
    return this.http.post(this.baseURL, evento);
  }
  postUpload(file: File, name: string){
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, name);
    return this.http.post(`${this.baseURL}/upload/`, formData);
  }
  putEvento(evento: Evento){
    console.log(evento);
    return this.http.put(`${this.baseURL}/${evento.id}`, evento);
  }
  deleteEvento(id: number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
