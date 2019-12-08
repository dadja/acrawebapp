import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollecteurService } from 'src/app/services/collecteur.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DeviceService } from 'src/app/services/device.service';
import { FormControl } from '@angular/forms';
import { firestore } from 'firebase';
import { FirebaseFirestore } from '@angular/fire';

@Component({
  selector: 'app-afficher-collecteur',
  templateUrl: './afficher-collecteur.component.html',
  styleUrls: ['./afficher-collecteur.component.css']
})
export class AfficherCollecteurComponent implements OnInit {
  appareils;
  devices =[];
  deviceSubscription: Subscription; 
  idDevice;//relatifs aux devices
  deviceUnique;
  searchText;
  closeResult: string; //pour la modale
  closeResult1: string; //pour la modale de mise a jour du collecteur

  //update
  updateCollecteur;
  updatenom = new FormControl('');
  updateprenom = new FormControl('');
  updateemail = new FormControl('');
  updatetel = new FormControl('');

  color = localStorage.getItem('color');
  collecteurs;
  collectors =[];
  collecteurSubscription: Subscription; //relatifs aux collecteurs
  idCollecteur;
  constructor(private collecteurService: CollecteurService, private modalService: NgbModal, private deviceService: DeviceService) { }

  ngOnInit() {
    this.collecteurService.getAllCollecteursByPartenaires();
    this.collecteurService.collecteurs$.subscribe(
      (doc)=>{
        this.collecteurs = doc;
        this.collecteurs.forEach((element) => {
          // if (element.deviceId.localeCompare('')===0){
          //   element.deviceId = "";
          // }
          this.collectors.push(element);
        });
        console.log(this.collecteurs);
      }
    );
    this.getDevices();
  }
 
  getDevices(){
    this.deviceService.getAllDevices();
    this.deviceSubscription = this.deviceService.devices$.subscribe(
      (doc)=>{
        console.log(doc);
        this.appareils = doc;
        this.appareils.forEach((element) => {
          console.log(element.isFree);
          if(element.isFree === "true"){
            this.devices.push(element);
          }
        });
        console.log('les devices',this.devices);
        this.appareils = [];
        console.log(this.appareils);
  });
}


  open(content, CollecteurID) {
    this.idCollecteur = CollecteurID;
    console.log(event);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${this.idDevice}`;
      this.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open1(updatecollecteur, collecteur) {
    console.log(collecteur);
    this.updateCollecteur = collecteur;
    this.updatenom.setValue(this.updateCollecteur.nom);
    this.updateprenom.setValue(this.updateCollecteur.prenom);
    this.updateemail.setValue(this.updateCollecteur.email);
    this.updatetel.setValue(this.updateCollecteur.tel);
    this.modalService.open(updatecollecteur, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult1 = `${result}`;
      // this.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateDatacollecteur(){
    if (this.closeResult1 === "enregistrer"){
      this.collecteurService.updateCollecteur(this.updateCollecteur, this.updatenom.value, this.updateprenom.value, this.updateemail.value, this.updatetel.value);
    }
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

  takeIdDevice(value){
    console.log(value);
    this.idDevice = value;
    this.deviceService.getOneDevice(this.idDevice).subscribe(
      (docData)=>{
        console.log(docData);
        const deviceObject = docData.data();
        this.deviceUnique = deviceObject.deviceNumber;
        console.log(this.deviceUnique);
      }
    )
  }
  close(){
    console.log(this.closeResult);
    this.collecteurService.updateAssocierCollecteur(this.idCollecteur, this.closeResult, this.deviceUnique);
    this.deviceService.updateAssocierDevice(this.idCollecteur, this.closeResult);
    this.appareils = [];
    this.devices = [];
    this.collectors = [];
    this.collecteurs = [];
  }

  dissocier(collecteurId){
    console.log(collecteurId);
    this.deviceService.updateDissocierDevice(collecteurId);
    this.collecteurService.updateDissocierCollecteur(collecteurId);
    this.appareils = [];
    this.devices = [];
    this.collectors = [];
    this.collecteurs = [];
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.collectors = [];
    this.collecteurs = [];
    this.appareils = [];
  }
}
