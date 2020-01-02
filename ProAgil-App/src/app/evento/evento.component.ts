import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  _filtroLista: string;
  eventosFiltrados: any = [];
  eventos: Evento[] = [];
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
  filtrarEvento(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  constructor(private eventoService: EventoService) {}

  ngOnInit() {
    this.getEventos();
  }
  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }
  getEventos(){
    this.eventoService.getAllEvento().subscribe(
       (eve: Evento[]) => {
        this.eventosFiltrados = eve;
        this.eventos = eve;
        console.log(eve);
      },
      error => {
        console.log(error);
      }
    );
  }
}
