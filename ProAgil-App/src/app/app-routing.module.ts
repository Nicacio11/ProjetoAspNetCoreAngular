import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import { PalestranteComponent } from './palestrante/Palestrante.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatoComponent } from './contato/contato.component';


const routes: Routes = [
  {path: 'evento', component: EventoComponent},
  {path: 'palestrante', component: PalestranteComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'contato', component: ContatoComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
