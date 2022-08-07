import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { LoginComponent } from './componentes/login/login.component';
import { SobreMiComponent } from './componentes/sobre-mi/sobre-mi.component';

const routes: Routes = [
  { path:"",component:HeaderComponent },
  {path:"",component:SobreMiComponent},
  { path:"login",component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
