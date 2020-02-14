import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventoService } from 'src/app/_services/evento.service';
import { BsModalService, BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/_models/Evento';


@Component({
  selector: 'app-evento-edit',
  templateUrl: './eventoEdit.component.html',
  styleUrls: ['./eventoEdit.component.css']
})
export class EventoEditComponent implements OnInit {
  titulo = 'Editar Evento';
  registerForm: FormGroup;
  evento = {};
  constructor(private fb: FormBuilder, private eventoService: EventoService, private modalService: BsModalService, 
              private localeService: BsLocaleService, private toastr: ToastrService) {
      this.localeService.use('pt-br');
    }

  ngOnInit() {
    this.validation();
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
      qtdPessoas : ['', [Validators.required, Validators.max(120000)]],
      lotes: this.fb.group({
        nome: ['', Validators.required],
        quantidade: ['', Validators.required],
        preco: ['', Validators.required],
        dataInicio: [''],
        dataFim: ['']
      }),
      redesSociais: this.fb.group({
        nome: ['', Validators.required],
        url: ['', Validators.required]
      })

    });
  }
}
