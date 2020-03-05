import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask'
import { NgxCurrencyModule } from 'ngx-currency'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ContatoComponent } from './contato/contato.component';
import { EventoComponent } from './evento/evento.component';
import { EventoEditComponent } from './evento/eventoEdit/eventoEdit.component';

import { PalestranteComponent } from './palestrante/Palestrante.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';


import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { UserComponent } from './user/user.component';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      TituloComponent,
      EventoComponent,
      ContatoComponent,
      PalestranteComponent,
      DashboardComponent,
      DateTimeFormatPipePipe,
      UserComponent,
      LoginComponent,
      RegistrationComponent,
      EventoEditComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      NgxMaskModule.forRoot(),
      NgxCurrencyModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
         timeOut: 3000,
         preventDuplicates: true,
         progressBar: true

      })
   ],
   providers: [
      //injetando o inceptador
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      }],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
