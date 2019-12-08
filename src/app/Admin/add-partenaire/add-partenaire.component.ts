import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Partenaire } from 'src/app/models/partenaire.model';
import { PartenaireAuthService } from 'src/app/services/partenaire-auth.service';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { ColorEvent } from 'ngx-color';
import { database } from 'firebase';

@Component({
  selector: 'app-add-partenaire',
  templateUrl: './add-partenaire.component.html',
  styleUrls: ['./add-partenaire.component.css']
})
export class AddPartenaireComponent implements OnInit {
  partenaireForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    adresse: new FormControl(''),
    email: new FormControl(''),
    motDePasse: new FormControl(''),
    motDePasseControl: new FormControl(''),
    nomAgence: new FormControl(''),
  });
  color;
  partenaire = new Partenaire();
  ref;
  task;
  uploadProgress;
  downloadURL;
  errorCreateMotDePasse;
  constructor(private afStorage: AngularFireStorage, private partenaireService: PartenaireAuthService, private adminService: AdminAuthService,  private router: Router) { }

  ngOnInit() {
  }
  afficherPartenaire(){
    this.router.navigate(['afficherPartenaire']);
  }

  createPartenaire(){
    this.errorCreateMotDePasse = '';
    const data = this.partenaireForm.value;
    if (data.motDePasse === data.motDePasseControl){
    data['logoUrl'] = localStorage.getItem('downloadUrl');
    data['adminId'] = localStorage.getItem('administrateur');
    data['paysResidance'] = 'Senegal';
    data['couleur_primaire'] = this.color;

    this.partenaireService.addPartenaire(data.prenom, data.nom, data.email, data.paysResidance, data.motDePasse, data.adresse, data.logoUrl, data.couleur_primaire, data.nomAgence, data.adminId);
    localStorage.removeItem('downloadUrl');
    this.router.navigate(['adminHome']);
  } else {
      this.errorCreateMotDePasse = 'Les mots de passe que vous avez entrés ne sont pas identiques';
  }
    
  }
  // methode qui gere la coleur
  handleChange($event: ColorEvent) {
    this.color = $event.color.hex;
    
  }

  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(randomId+'.png');
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
    finalize(() => { this.ref.getDownloadURL().subscribe(
      (boom)=>{
        localStorage.setItem("downloadUrl", boom);
        });
      } )
 )
.subscribe()
    
  }
  dashboard(){
    this.router.navigate(['adminHome']);
  }

  logout(){
    this.adminService.logout();
  }

}
