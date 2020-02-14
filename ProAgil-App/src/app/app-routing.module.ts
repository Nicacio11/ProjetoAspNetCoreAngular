import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import { PalestranteComponent } from './palestrante/Palestrante.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatoComponent } from './contato/contato.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { EventoEditComponent } from './evento/eventoEdit/eventoEdit.component';


const routes: Routes = [
  {path: 'user', component: UserComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
    ]
  },
  {path: 'evento', component: EventoComponent, canActivate:[AuthGuard]},
  {path: 'evento/:id/edit', component: EventoEditComponent, canActivate:[AuthGuard]},
  {path: 'palestrante', component: PalestranteComponent, canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'contato', component: ContatoComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
