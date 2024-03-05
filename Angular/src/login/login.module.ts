import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginComponentComponent } from './Pages/login-component/login-component.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    LoginComponentComponent
  ],
  imports: [
    CommonModule,MaterialModule,
    LoginRoutingModule,ReactiveFormsModule
  ]
})
export class LoginModule { }
