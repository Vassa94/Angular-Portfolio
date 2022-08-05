import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { HeaderComponent } from './componentes/header/header.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { SobreMiComponent } from './componentes/sobre-mi/sobre-mi.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { NavComponent } from './componentes/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





  

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExperienciaComponent,
    SobreMiComponent,
    EducacionComponent,
    ProyectosComponent,
    SkillsComponent,
    ContactoComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
