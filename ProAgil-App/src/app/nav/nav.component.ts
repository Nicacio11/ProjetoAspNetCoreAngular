import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit() {
  }
  loggedIn(){
    return this.authService.loggedIn();
  }
  logout(){
    localStorage.removeItem('Token');
    this.router.navigate(['/user/login']);
    this.toastr.show('Deslogado com sucesso!');
  }
  entrar(){
    this.router.navigate(['/user/login']);
  }
}
