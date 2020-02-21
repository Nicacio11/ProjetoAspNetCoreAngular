import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EventoService } from 'src/app/_services/evento.service';
import { BsModalService, BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/_models/Evento';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-evento-edit',
  templateUrl: './eventoEdit.component.html',
  styleUrls: ['./eventoEdit.component.css']
})
export class EventoEditComponent implements OnInit {
  titulo = 'Editar Evento';
  imagemUrl = 'assets/imgs/upload.png';
  registerForm: FormGroup;
  evento: Evento = new Evento();
  file: File;
  fileNameToUpdate: string;
  dataAtual;

  get lotes(): FormArray{
    return <FormArray> this.registerForm.get('lotes');
  }
  get redesSociais(): FormArray{
    return <FormArray> this.registerForm.get('redesSociais');
  }

  constructor(private fb: FormBuilder, private eventoService: EventoService, private router: ActivatedRoute, 
              private localeService: BsLocaleService, private toastr: ToastrService) {
      this.localeService.use('pt-br');
    }

  ngOnInit() {
    this.validation();
    this.carregarEvento();
  }
  validation() {
    this.registerForm = this.fb.group({
      id: [],
      tema : ['',
        [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      local : ['', Validators.required],
      dataEvento : ['', Validators.required],
      telefone : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      imagemUrl : [''],
      qtdPessoas : ['', [Validators.required, Validators.max(120000)]],
      lotes: this.fb.array([]),
      redesSociais: this.fb.array([])
    });
  }
  carregarEvento(){
    const idEvento = +this.router.snapshot.paramMap.get('id');
    this.eventoService.getEventoById(idEvento)
      .subscribe((evento: Evento) => {
        console.log( JSON.stringify(evento))
        this.evento = Object.assign({}, evento);
        this.imagemUrl = `http://localhost:5000/resources/images/${ this.evento.imagemUrl }?_ts${ this.dataAtual }`
        this.fileNameToUpdate = this.evento.imagemUrl.toString();
        this.evento.imagemUrl = '';
        this.registerForm.patchValue(this.evento);

        this.evento.lotes.forEach(lote => {
          this.lotes.push(this.criarLote(lote));
        });
        this.evento.redesSociais.forEach(redeSocial => {
          this.redesSociais.push(this.criarRedeSocial(redeSocial));
        });
      });
  }
  criarLote(lote: any): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim,]
    });
  }
  criarRedeSocial(redeSocial: any): FormGroup {
    return this.fb.group({
      id: [redeSocial.id],
      nome: [redeSocial.nome, Validators.required],
      url: [redeSocial.url, Validators.required]
    });
  }
  adicionarLote(){
    this.lotes.push(this.criarLote({id : 0}));
  }
  removerLote(id: number){
    this.lotes.removeAt(id);
  }
  adicionarRedeSocial(){
    this.redesSociais.push(this.criarRedeSocial({id : 0}));
  }
  removerRedeSocial(id: number){
    this.redesSociais.removeAt(id);
  }
  onFileChange(file: FileList){
    const reader = new FileReader();
    reader.onload = (event: any) => this.imagemUrl = event.target.result;
    reader.readAsDataURL(file[0]);
  }
  salvarEvento(registerForm: any){
    console.log(JSON.stringify(registerForm.value));
  }
}
