import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  constructor(private router: Router,
    private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit() {
    this.validation();
  }
  validation(){
    this.registerForm = this.fb.group({
      fullName : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      userName : ['', [Validators.required, Validators.minLength(4)]],
      passwords: this.fb.group({
        password : ['', Validators.required],
        confirmPassword : ['', Validators.required]
      }, {validator :  this.compararSenhas})
    });
  }
  compararSenhas(fb: FormGroup){
    const confimeSenhaCtrl = fb.get('confirmPassword');
    if(confimeSenhaCtrl.errors ==  null || 'mismatch' in confimeSenhaCtrl.errors){
      if(fb.get('password').value !== confimeSenhaCtrl.value){
        confimeSenhaCtrl.setErrors({mismatch: true});
      } else {
        confimeSenhaCtrl.setErrors(null);
      }
    }
  }
  cadastrarUsuario(){
    if(this.registerForm.valid){
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value}, this.registerForm.value);
      this.authService.register(this.user).subscribe( x => {
        this.router.navigate(['/user/login']);
        this.toastr.success('Cadastro realizado');
      }, error => {
        const erro = error.error;
        erro.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Usuario ja existe!');
              break;
            default:
              this.toastr.error(`Erro no cadastro! Code ${element.code}`);
              break;
          }
        });
      });
    }
  }
}