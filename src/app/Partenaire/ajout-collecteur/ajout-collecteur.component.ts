import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CollecteurService } from 'src/app/services/collecteur.service';

@Component({
  selector: 'app-ajout-collecteur',
  templateUrl: './ajout-collecteur.component.html',
  styleUrls: ['./ajout-collecteur.component.css']
})
export class AjoutCollecteurComponent implements OnInit {
  @Output() onPageChild = new EventEmitter<string>();
  color;
  collecteurForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    tel: new FormControl('')
  });
  constructor(private collecteurService: CollecteurService) { }

  ngOnInit() {
    this.color = localStorage.getItem('color');
  }

  addCollecteur(){
    console.log(this.collecteurForm.value);
    const data = this.collecteurForm.value;
    data['partenaire'] = localStorage.getItem('administrateur');
    data['deviceId'] = "";
    console.log(data);
    if (data.email.localeCompare("") === 0 && data.nom.localeCompare("") === 0 && data.prenom.localeCompare("") === 0 && data.tel.localeCompare("") === 0) {
      alert('Veuillez remplir les champs');
    } else {
      //console.log(data);
    this.collecteurService.addCollecteur(data);
    //this.childPage = 'accueil';
    this.setPage();
    }
  }
  setPage(){
    this.onPageChild.emit('accueil');
 }
 

}
