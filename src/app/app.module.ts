import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact-form/contact-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { AngularMaterialModule } from './angular-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdvantagesComponent } from './advantages/advantages.component';
import { GallaryLightboxComponent } from './gallery-lightbox/gallery-lightbox.component';
import { FooterComponent } from './footer/footer.component';
import { MatInputModule } from '@angular/material/input';

export function playerFactory(): any {
  return import('lottie-web');
}
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProjectsComponent,
    PageNotFoundComponent,
    AboutComponent,
    AdvantagesComponent,
    GallaryLightboxComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ContactComponent,
    NoopAnimationsModule,
    MatInputModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory })
    /*
    RouterModule.forRoot([
      {path: 'projects', component: ProjectsComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact-form', component: ContactComponent},
      {path: '', redirectTo: '/about', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ])
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
