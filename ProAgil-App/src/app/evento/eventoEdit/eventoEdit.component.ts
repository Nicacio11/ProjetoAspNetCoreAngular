import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  imagemUrl = 'assets/imgs/upload.png';
  registerForm: FormGroup;
  evento:Evento = new Evento();
  file: File;

  get lotes(): FormArray{
    return <FormArray> this.registerForm.get('lotes');
  }
  get redesSociais(): FormArray{
    return <FormArray> this.registerForm.get('redesSociais');
  }

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
      imagemUrl : [''],
      qtdPessoas : ['', [Validators.required, Validators.max(120000)]],
      lotes: this.fb.array([this.criarLote()]),
      redesSociais: this.fb.array([this.criarRedeSocial()])
    });
  }

  criarLote(): FormGroup{
    return this.fb.group({
      nome: ['', Validators.required],
      quantidade: ['', Validators.required],
      preco: ['', Validators.required],
      dataInicio: [''],
      dataFim: ['']
    });
  }
  criarRedeSocial(): FormGroup{
    return this.fb.group({
      nome: ['', Validators.required],
      url: ['', Validators.required]
    });
  }
  adicionarLote(){
    this.lotes.push(this.criarLote());
  }
  removerLote(id: number){
    this.lotes.removeAt(id);
  }
  adicionarRedeSocial(){
    this.redesSociais.push(this.criarRedeSocial());
  }
  removerRedeSocial(id: number){
    this.redesSociais.removeAt(id);
  }
  onFileChange(file: FileList){
    const reader = new FileReader();
    reader.onload = (event: any) => this.imagemUrl = event.target.result;
    reader.readAsDataURL(file[0]);
  }
}
