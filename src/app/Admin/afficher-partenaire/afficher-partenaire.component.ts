import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PartenaireAuthService } from 'src/app/services/partenaire-auth.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-afficher-partenaire',
  templateUrl: './afficher-partenaire.component.html',
  styleUrls: ['./afficher-partenaire.component.css']
})
export class AfficherPartenaireComponent implements OnInit {
  idPartenaire;
  closeResult;
  color = '#ec6a10';
  PartenaireSubscription: Subscription;
  partenaires;
  partenaireToChange;
  searchText;

  nomPartenaire = new FormControl('');
  adresse = new FormControl('');
  

  constructor(private router: Router, private adminService: AdminAuthService,private partenaireService: PartenaireAuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.partenaireService.getAllPartenaire();
    this.PartenaireSubscription = this.partenaireService.partenaireSubject.subscribe(
      (doc)=>{
        console.log(doc);
        this.partenaires = doc;
      }
    )
  }

  desactiver(data){
    console.log(data);
    data.actif = false;
    this.partenaireService.updatepartenaireActif(data.id, data.actif);
  }

  activer(data){
    console.log(data);
    data.actif = true;
    this.partenaireService.updatepartenaireActif(data.id, data.actif);
  }

  modifierPartenaire(){
    console.log(this.nomPartenaire.value, this.adresse.value);
    this.partenaireToChange.nomPartenaire = this.nomPartenaire.value;
    this.partenaireToChange.adresse = this.adresse.value;
    this.partenaireService.updatePartenaire1(this.partenaireToChange.id, this.partenaireToChange.nomPartenaire, this.partenaireToChange.nom, this.partenaireToChange.prenom, this.partenaireToChange.paysResidance, this.partenaireToChange.adresse, this.partenaireToChange.logoUrl, this.partenaireToChange.couleur_primaire, this.partenaireToChange.mdp, this.partenaireToChange.adminId);
  }

  open(content, PartenaireID) {
    console.log(PartenaireID);
    this.partenaireToChange = PartenaireID;
    this.nomPartenaire.setValue(this.partenaireToChange.nomPartenaire);
    this.adresse.setValue(this.partenaireToChange.adresse);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createPartenaire(){
    this.router.navigate(['ajouterPartenaire']);
  }

   getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

 

  dashboard(){
    this.router.navigate(['adminHome']);
  }

  afficherPartenaires(){
    this.router.navigate(['afficherPartenaire']);
  }

  logout(){
    this.adminService.logout();
  }

  ngOnDestroy(): void {
    this.partenaires = [];
  }
}
