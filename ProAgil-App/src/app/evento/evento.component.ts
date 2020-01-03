import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {defineLocale, BsLocaleService, ptBrLocale} from 'ngx-bootstrap';
defineLocale('pt-br', ptBrLocale);
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
  modalRef: BsModalRef;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private eventoService: EventoService, private modalService: BsModalService, private localeService: BsLocaleService) {
    this.localeService.use('pt-br');
  }
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

  validation(){
    this.registerForm = this.fb.group({
      tema : ['',
        [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      local : ['', Validators.required],
      dataEvento : ['', Validators.required],
      telefone : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      imagemUrl : ['', Validators.required],
      qtdPessoas : ['', 
        [Validators.required, Validators.max(12000)]]

    });
  }
  salvarAlteracao(){

  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    this.validation();
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
