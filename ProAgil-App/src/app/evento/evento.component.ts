import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {defineLocale, BsLocaleService, ptBrLocale} from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  titulo = 'Eventos';
  _filtroLista: string;
  eventosFiltrados: any = [];
  eventos: Evento[] = [];
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm: FormGroup;
  modoSalvar = '';
  bodyDeletarEvento = '';
  file: File;
  fileNameToUpdate: string;
  dataAtual: string;

  constructor(private fb: FormBuilder,    private eventoService: EventoService, private modalService: BsModalService, 
  private localeService: BsLocaleService, private toastr: ToastrService) {
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

  validation() {
    this.registerForm = this.fb.group({
      tema : ['',
        [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      local : ['', Validators.required],
      dataEvento : ['', Validators.required],
      telefone : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      imagemUrl : ['', Validators.required],
      qtdPessoas : ['', 
        [Validators.required, Validators.max(120000)]]

    });
  }
  salvarAlteracao(template: any) {
    if(this.registerForm.valid){
      if(this.modoSalvar === 'post'){
        this.evento = Object.assign({}, this.registerForm.value);
        this.uploadImagem();
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento) => {
            template.hide();
            this.getEventos();
            this.toastr.success('Inserido com sucesso!');
          }, error => {
            this.toastr.error(`Erro ao inserir: ${error.message}!`);
          }
          );
        } else {
          this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
          console.log(this.evento);
          this.uploadImagem();
          this.eventoService.putEvento(this.evento).subscribe(
            (novoEvento) => {
              template.hide();
              this.getEventos();
              this.toastr.success('Editado com sucesso!');
            }, error => {
              this.toastr.error(`Erro ao alterar: ${error.message}!`);}
            );
        }
    }
  }
  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }
  uploadImagem() {
    if (this.modoSalvar === 'post') {
      const nomeArquivo = this.evento.imagemUrl.split('\\', 3);
      this.evento.imagemUrl = nomeArquivo[2];

      this.eventoService.postUpload(this.file, nomeArquivo[2])
      .subscribe(() => {
        this.dataAtual = new Date().getMilliseconds().toString();
        this.getEventos();
      });
    } else {
      this.evento.imagemUrl = this.fileNameToUpdate;
      this.eventoService.postUpload(this.file, this.fileNameToUpdate)
        .subscribe(
          () => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getEventos();
          }
        );
    }
  }
  ngOnInit() {
    this.validation();
    this.getEventos();
  }
  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }
  getEventos() {
    this.eventoService.getAllEvento().subscribe(
       (eve: Evento[]) => {
        this.eventosFiltrados = eve;
        this.eventos = eve;
        this.dataAtual = new Date().getMilliseconds().toString();
      },
      error => {
        this.toastr.error(`Erro ao carregar: ${error.message}!`);
      }
    );
  }

  editarEvento(evento: Evento, template: any){
    this.openModal(template);
    this.modoSalvar = 'put';
    this.evento = Object.assign({}, evento);
    this.fileNameToUpdate = this.evento.imagemUrl.toString();
    this.evento.imagemUrl = '';
    this.registerForm.patchValue(this.evento);
  }

  novoEvento(template: any) {
    this.openModal(template);
    this.modoSalvar = 'post';
  }
  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.tema}`;
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Excluido com sucesso!');
        }, error => {
          this.toastr.error(`Erro ao excluir: ${error.message}!`);
        }
    );
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length){
      this.file = event.target.files;
  }
}
}
