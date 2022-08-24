import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { LoginComponent } from './componentes/login/login.component';


const routes: Routes = [
  { path:"",component: HeaderComponent },
  { path:"login",component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
