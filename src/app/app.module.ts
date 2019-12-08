import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login/login.component';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {RouterModule, Routes} from '@angular/router';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { AdminSpaceComponent } from './Admin/admin-space/admin-space.component';
import { MotDePasseComponent } from './Partenaire/mot-de-passe/mot-de-passe.component';
import { PartenairesComponent } from './Partenaire/partenaires/partenaires.component';
import { AddPartenaireComponent } from './Admin/add-partenaire/add-partenaire.component';


import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { BatimentpublicComponent } from './Partenaire/typecollecte/batimentpublic/batimentpublic.component';
import { BatimentpriveComponent } from './Partenaire/typecollecte/batimentprive/batimentprive.component';
import { LatrineComponent } from './Partenaire/typecollecte/latrine/latrine.component';
import { DangerComponent } from './Partenaire/typecollecte/danger/danger.component';
import { PointeauComponent } from './Partenaire/typecollecte/pointeau/pointeau.component';
import { AjoutCollecteurComponent } from './Partenaire/ajout-collecteur/ajout-collecteur.component';
import { AccueilComponent } from './Partenaire/accueil/accueil.component';
import { AfficherCollecteurComponent } from './Partenaire/afficher-collecteur/afficher-collecteur.component';
import { AfficherDeviceComponent } from './Partenaire/afficher-device/afficher-device.component';
import { FilterPipe } from './filter.pipe';
import { AjoutDeviceComponent } from './Partenaire/ajout-device/ajout-device.component';
import { CollectrFilterPipe } from './collectr-filter.pipe';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ParametresComponent } from './Partenaire/parametres/parametres.component';
import { AfficherPartenaireComponent } from './Admin/afficher-partenaire/afficher-partenaire.component';
import { PartenairesFilterPipe } from './partenaires-filter.pipe';
import { ByDatePipe } from './by-date.pipe';

//Information de connexion au projet firebase
var config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'adminHome', component: AdminSpaceComponent},
  {path: 'initialiser_mot_depasse', component: MotDePasseComponent},
  {path: 'partenaireHome', component: PartenairesComponent},
  {path: 'ajouterPartenaire', component: AddPartenaireComponent},
  {path: 'afficherPartenaire', component: AfficherPartenaireComponent},
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    ModalComponent,
    AdminSpaceComponent,
    MotDePasseComponent,
    PartenairesComponent,
    AddPartenaireComponent,
    BatimentpublicComponent,
    BatimentpriveComponent,
    LatrineComponent,
    DangerComponent,
    PointeauComponent,
    AjoutCollecteurComponent,
    AccueilComponent,
    AfficherCollecteurComponent,
    AfficherDeviceComponent,
    FilterPipe,
    AjoutDeviceComponent,
    CollectrFilterPipe,
    ParametresComponent,
    AfficherPartenaireComponent,
    PartenairesFilterPipe,
    ByDatePipe
  ],
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ColorSketchModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(), // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AgmCoreModule.forRoot({
      apiKey: ''  /* apiKey Google Map */
    
    }),
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [
    ModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
