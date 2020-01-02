import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  _filtroLista: string;
  eventosFiltrados: any = [];
  eventos: any;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  get filtroLista() {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEvento(this.filtroLista)
      : this.eventos;
  }
  filtrarEvento(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEventos();
  }
  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }
  getEventos() {
    this.eventos = this.http.get('http://localhost:5000/site/evento').subscribe(
      response => {
        this.eventos = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
