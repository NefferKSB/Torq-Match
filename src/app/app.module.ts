import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { AngularMaterialModule } from './angular-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdvantagesComponent } from './advantages/advantages.component';
import { GallaryLightboxComponent } from './gallery-lightbox/gallery-lightbox.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProjectsComponent,
    ContactFormComponent,
    PageNotFoundComponent,
    AboutComponent,
    AdvantagesComponent,
    GallaryLightboxComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    RouterModule.forRoot([
      {path: 'projects', component: ProjectsComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact-form', component: ContactFormComponent},
      {path: '', redirectTo: '/about', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
