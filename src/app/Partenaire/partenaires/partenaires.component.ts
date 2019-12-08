import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartenaireAuthService } from 'src/app/services/partenaire-auth.service';
import { CollectesService } from 'src/app/services/collectes.service';
import { Subscription } from 'rxjs'; 
import { FormControl, FormGroup } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ExportToCsv } from 'export-to-csv';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ColorEvent } from 'ngx-color';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { RegionsService } from 'src/app/services/regions.service';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.css']
})
export class PartenairesComponent implements OnInit {

  collecteSubscribtion;
  PartenaireConnected;
  role;
  nomPartenaire;
  logo;
  color;
  colorTampon;

  ref;
  task;
  uploadProgress;
  downloadURL;

  // latitude = 14.6937;
  // longitude = -17.44406 ;
  // mapType = 'roadmap';
  // zoom = 6;

  
  //filterTypeCollect;
 
  //selectedCollect;

  // typeCollect = ''; //variable pour faire le check sur le type de collecte pour l'affichage
  page = 'accueil'; //variable pour gerer les differents component dans l espace partenaire
  // safeMarkers; //markers tampons
  // markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    // { latitude: 14.7117151,longitude: -17.4536784, alpha: 1 },
    // { latitude: 14.750152, longitude: -17.4754768, alpha: 1  },
    
  // ]
  // parentMarker;
  // collecteSubscription: Subscription;
  // lesCollectes;
  // selectedMarker;
  closeResult: string;
  constructor(private afStorage: AngularFireStorage,private modalService: NgbModal, private router: Router, private partenaireService: PartenaireAuthService, private collectes: CollectesService, config: NgbPopoverConfig, private regionsService: RegionsService) { 
    config.placement = 'right';
    config.triggers = 'hover';
    // this.PartenaireConnected =this.partenaireService.partenaireConnectedSubject.subscribe(
    //   (connected) => {
    //     console.log(connected);
    //     // if (!localStorage.getItem("administrateur")) {
    //     //   this.router.navigate(['auth']);
    //     // }
    //     if (connected === false) {
    //       this.router.navigate(['login']);
    //     }
    //   }
    // );
    const nom = localStorage.getItem('nom');
    const role = localStorage.getItem('role');
    const logo = localStorage.getItem('logo');
    const color = localStorage.getItem('color');
    const administrateur = localStorage.getItem('administrateur');
    const firstConn = localStorage.getItem('firstConn');
    const prenom = localStorage.getItem('prenom');
    const nomPartenaire = localStorage.getItem('nomPartenaire');
    console.log(nom);
    if (!role && !nom && !logo && !color && !administrateur && !firstConn && !prenom && !nomPartenaire) {
      localStorage.clear();
      this.router.navigate(['login']);
    } else {
      if (role === 'admin'){
        this.router.navigate(['login']);
      } else {
        console.log('ping');
      }
      
    }
  }
  ngOnInit() {
    this.loadScript();
    //this.color = '#101fec';
    this.color = localStorage.getItem('color');
    this.colorTampon = this.color;
    console.log(this.colorTampon);
    this.nomPartenaire = localStorage.getItem('nomPartenaire');
    this.logo = localStorage.getItem('logo');
    this.role = localStorage.getItem('role');
    // if(this.role.localeCompare('partenaire')!==0 && localStorage.getItem('nom') && localStorage.getItem('prenom') && localStorage.getItem('logo') && localStorage.getItem('color') && localStorage.getItem('role') && localStorage.getItem('administrateur') && localStorage.getItem('prenom') && localStorage.getItem('nomPartenaire')){
    //   this.router.navigate(['login']);
    // }

   
    
  }


  
  logout(){
      this.partenaireService.logout();
  }

  upload(event) {
    console.log(event.target.files[0]);
     const randomId = Math.random().toString(36).substring(2);
     console.log(randomId);
     this.ref = this.afStorage.ref(randomId+'.png');
     this.task = this.ref.put(event.target.files[0]);
     //this.downloadURL = this.task.downloadURL();
    //setTimeout(function(){ console.log(this.downloadURL); }, 3000);
  }

  handleChange($event: ColorEvent) {
    console.log($event.color.hex);
    this.color = $event.color.hex;
    localStorage.setItem('color', this.color);
    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
  }
  //methode qui charge un script js
  loadScript() { const dynamicScripts = [
    'assets/js/sb-admin-2.js',
  ];
  for (let i = 0; i < dynamicScripts.length; i++) {
    const node = document.createElement('script');
    node.src = dynamicScripts[i];
    node.type = 'text/javascript';
    node.async = false;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}

///// Modal

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `${result}`;
    if(this.closeResult.localeCompare('annulé')===0){
      console.log(this.colorTampon);
      this.color = this.colorTampon;
      localStorage.setItem('color', this.color);
    }
    if(this.closeResult.localeCompare('Sauvegarder')===0){
      this.partenaireService.getDataPartenaire(localStorage.getItem('administrateur')).subscribe(
        (ok)=>{
          console.log(ok);
          if (ok.exists) {
            const data = ok.data();
            console.log(data);
            data.couleur_primaire = this.color;
            this.partenaireService.updatePartenaire(localStorage.getItem('administrateur'), data.nom, data.prenom, data.paysResidance, data.adresse, data.logoUrl, data.couleur_primaire, data.mdp, data.adminId);
          }
        }
      )
    }
    console.log(this.closeResult);
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

open1(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `${result}`;
    if(this.closeResult.localeCompare('annulé')===0){
      // console.log(this.colorTampon);
      // this.color = this.colorTampon;
      localStorage.setItem('color', this.color);
    }
    if(this.closeResult.localeCompare('Sauvegarder')===0){
      let linkLogo = localStorage.getItem('logo');
      console.log(linkLogo);
      if (linkLogo===null){
      this.afStorage.storage.refFromURL(linkLogo).delete();
    }
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
      finalize(() => { this.ref.getDownloadURL().subscribe(
        (boom)=>{
          console.log(boom);
          localStorage.setItem("logo", boom);
          this.partenaireService.getDataPartenaire(localStorage.getItem('administrateur')).subscribe(
            (ok)=>{
              console.log(ok);
              if (ok.exists) {
                const data = ok.data();
                console.log('on affiche data de la requette ', data);
                data.logoUrl = localStorage.getItem('logo');
                this.logo = data.logoUrl;
                this.partenaireService.updatePartenaire(localStorage.getItem('administrateur'), data.nom, data.prenom, data.paysResidance, data.adresse, data.logoUrl, data.couleur_primaire, data.mdp, data.adminId);
              }
            }
          )
          });
        } )
   )
  .subscribe();
  

    }
    console.log(this.closeResult);
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

private getDismissReason1(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}











// selectMarker(event) {
//   console.log(event);
//   this.selectedMarker = {
//     lat: event.latitude,
//     lng: event.longitude,
//     id: event.title,
//   };

//   this.markers.forEach(
//     (marker)=>{
//       if (this.selectedMarker.id === marker.id){
//         this.typeCollect = marker.typecollecte;
//         console.log(this.typeCollect);
//         this.checkTypeCollecte(this.typeCollect);
//         this.parentMarker = marker;
//       }
//     }
//   )
//   ;
  

//   console.log(this.selectedMarker.lat);

//   console.log(this.selectedMarker);
// }


// //methode qui verifie le type de collecte
// checkTypeCollecte(data){
//   console.log(data);
//   switch (this.typeCollect) {
//     case 'batimentpublic':
//       this.typeCollect = 'batimentpublic';
//       console.log(this.typeCollect);
//       console.log('afficher batiment publique');
//       break;
//     case 'latrine':
//         this.typeCollect = 'latrine';
//         console.log('afficher latrine');
//         break;
//     case 'danger':
//       console.log('afficher danger');
//       // expected output: "Mangoes and papayas are $2.79 a pound."
//       break;
//     case 'batimentprive':
//         this.typeCollect = 'batimentprive';
//       console.log('afficher batimentprive');
//       // expected output: "Mangoes and papayas are $2.79 a pound."
//       break;
//     case 'pointeau':
//           this.typeCollect = 'pointeau';
//           console.log('afficher pointeau');
//           // expected output: "Mangoes and papayas are $2.79 a pound."
//           break;
//     default:
//       console.log('Sorry, we are out of');
//   }
// }


// filterByTypeCollect(selectedValue){
//   console.log(selectedValue);
//   if (selectedValue.localeCompare('fullMarkers')===0){
//     this.markers = this.safeMarkers;
//   }else {
//   this.markers = this.safeMarkers;
//   console.log(this.safeMarkers);
//   const markerFiltered = this.markers.filter(function(markers){
//     return markers.typecollecte == selectedValue;
//   });
//   console.log(markerFiltered);
//   this.markers = markerFiltered;
// }
// }

// exportCsv(){
//   const options = { 
//     fieldSeparator: ',',
//     filename:'collectes'+Date.now(),
//     quoteStrings: '"',
//     decimalSeparator: '.',
//     showLabels: false, 
//     showTitle: true,
//     title: 'My Awesome CSV '+ Date.now(),
//     useTextFile: false,
//     useBom: true,
//     useKeysAsHeaders: false,
//     // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
//   };
 
// const csvExporter = new ExportToCsv(options);
 
// csvExporter.generateCsv(this.markers);
// }
addDevice(){
  this.page = 'ajoutDevice';
}
addCollecteur(){
  this.page = 'ajoutCollecteur';
}
afficherCollecteur(){
  this.page = 'afficherCollecteur';
}
afficherDevice(){
  this.page = 'afficherDevice';
}
accueil(){
  this.page = 'accueil';
}
changeColor(){
    
}
onPage(val){
  console.log(val);
  this.page = val;
}
}
