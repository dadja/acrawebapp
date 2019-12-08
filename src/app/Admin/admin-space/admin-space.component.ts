import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import  {AdminAuthService} from 'src/app/services/admin-auth.service';
import {Subscription} from 'rxjs';
import { Router} from '@angular/router';
import { CollectesService } from 'src/app/services/collectes.service';
import { RegionsService } from 'src/app/services/regions.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PartenaireAuthService } from 'src/app/services/partenaire-auth.service';

import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.css']
})
export class AdminSpaceComponent implements OnInit {
  searchText;
  color;

  AdminConnected: Subscription;
  AdminDataSubscription: Subscription;
 
  nomAdmin;
  prenomAdmin;

  latitude = 14.6937;
  longitude = -17.44406 ;
  mapType = 'satellite';
  zoom = 6;
  markers;
  safeMarkers;
  parentMarker;
  collecteSubscription: Subscription;
  lesCollectes;
  selectedMarker;
  typeCollect;
  typeDeCollecte;
  partenaireSubscription: Subscription;

  partenaires;
  partenaire = "";
  regions: Region [];
  departements:  Departement[];
  arrondissements: Arrondissement[];
  communes: Commune[];

  countLatrine;  
  countDanger;
  countPointeau;
  countBaptimentPrive;
  countBaptimentPublic;


  theRegion = '';
  theDepartement = '';
  theArrondissement = '';
  theCommune = '';
  theVillage = '';

  map=false;

  keysDangers = [
  'region',
  'departement',
  'arrondissement',
  'commune',
  'village',
  'date',
  'partenaire',
  'collecteur',
  'latitude',
  'longitude',
  'nom',
  'type',
  'note'];

  keysBaptimentPublic = [
        'region',
        'departement',
        'arrondissement',
        'commune',
        'village',
        'date',
        'collecteur',
        'partenaire',
        'latitude',
        'longitude',
        'nombatiment',
        'soustypebatiment',
        'typebatiment',
        'robinetexistant',
        'robinetfonctionnel',
        'note'
  ];

  keysBaptimentPrive = [
    'region',
    'departement',
    'arrondissement',
    'commune',
    'village',
    'date',
    'collecteur',
    'latitude',
    'longitude',
    'nomproprio',
    'numproprio',
    'nbradultes',
    'nbrvieux',
    'nbrenfants',
    'robinetexistant',
    'robinetfonctionnel',
    'note'
  ]


  keysLatrine = ['region',
  'departement',
  'arrondissement',
  'commune',
  'village',
  'date',
  'partenaire',
  'collecteur',
  'latitude',
  'longitude',
  'nomproprio',
  'numproprio',
  'typelatrine',
  'superstructure',
  'dalle',
  'bonetatgeneral',
  'doublefosse',
  'siege',
  'ventilation',
  'porte',
  'fermeture',
  'toit',
  'couvercledefecation',
  'propre',
  'odeur',
  'slms',
  'note'
];
  keysPointeau = ['region',
  'departement',
  'arrondissement',
  'commune',
  'village',
  'date',
  'collecteur',
  'latitude',
  'longitude',
  'nompointeau',
  'typepointeau',
  'modelepompe',
  'profondeur',
  'couverclepuit',
  'typepuit',
  'puitdateexploitation',
  'puitusage',
  'puitdebithorairepompe',
  'puitdureejournalierepompage',
  'puitvolumemensuelpreleve',
  'puitnombrejourpompage',
  'puitniveaustatiquepuit',
  'puitpotentielhydraulique',
  'puittemperature',
  'puitconductiviteelectrique',
  'forageteteprotege',
  'foragesourcealimentation',
  'foragecloture',
  'foragedateexploitation',
  'forageusage',
  'foragedebithorairepompe',
  'foragedureejournalierepompage',
  'foragevolumemensuelpreleve',
  'foragenombrejourpompage',
  'forageniveaustatiqueforage',
  'foragepotentielhydraulique',
  'foragetemperature',
  'forageconductiviteelectrique',
  'sourcenote',
  'sourceamenage',
  'autretypepointeau',
  'bonetatgeneral',
  'cloture',
  'drainage',
  'amenage',
  'note'];

  closeResult: string;

  constructor(private modalService: NgbModal, private adminService: AdminAuthService, private collectes: CollectesService,private router: Router, private regionsServices: RegionsService, private partenaireService: PartenaireAuthService) {

    const administrateur = localStorage.getItem("administrateur");
    const nom = localStorage.getItem("nom");
    const prenom = localStorage.getItem("prenom");
    const role = localStorage.getItem("role");
    if (!role && !nom  && !administrateur && !prenom )  {
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }


  ngOnInit() {
    this.map = true;
    this.getRegions();
    this.getCompteur();
    this.loadScript();
        this.partenaireService.getAllPartenaire();
        this.collectes.getAllCollectesbyfiltersforAdmin(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, '');
        this.partenaireSubscription = this.partenaireService.partenaireSubject.subscribe(
          (values)=>{
            this.partenaires = values;
          }
        )
        this.nomAdmin= localStorage.getItem('nom');
        this.prenomAdmin = localStorage.getItem("prenom");
        console.log(this.nomAdmin);
        console.log(this.prenomAdmin, this.nomAdmin);
        if (localStorage.getItem('role').localeCompare('admin') !== 0){
          this.router.navigate(['login']);
        }
        this.collecteSubscription = this.collectes.collectes$.subscribe(
        (values)=> {
          console.log('la valeur qui sort du subject', values);
          this.markers = values;
          this.safeMarkers = this.markers; 
        }
        )
   
  }

  getdata(marker){
    console.log(marker);
    this.typeCollect = marker.typecollecte;
    this.checkTypeCollecte(this.typeCollect);
    this.parentMarker = marker;

    
     this.zoom = Number(6);
     setTimeout(()=>{
      this.longitude = Number(marker.longitude);
    this.latitude = Number(marker.latitude);
    this.zoom = Number(6);
    this.zoom = Number(19);
      }, 500)
    
  }

  changeMap(event){
    console.log(event.target.value);
    this.map = (this.map == true) ? false : true;
    this.mapType = (this.map == true) ? "satellite" : "roadmap";
  }

  afficherPartenaire(){
    this.router.navigate(['afficherPartenaire']);
  }

  createPartenair(){
    this.router.navigate(['ajouterPartenaire']);
  }
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

selectMarker(event) {
  this.selectedMarker = {
    lat: event.latitude,
    lng: event.longitude,
    id: event.title,
  };

  this.markers.forEach(
    (marker)=>{
      if (this.selectedMarker.id === marker.id){
        this.typeCollect = marker.typecollecte;
        this.checkTypeCollecte(this.typeCollect);
        this.parentMarker = marker;
      }
    }
  );
  

  
}

checkTypeCollecte(data){
  console.log(data);
  switch (this.typeCollect) {
    case 'batimentpublic':
      this.typeCollect = 'batimentpublic';
      console.log(this.typeCollect);
      console.log('afficher batiment publique');
      break;
    case 'latrine':
        this.typeCollect = 'latrine';
        console.log('afficher latrine');
        break;
    case 'danger':
      break;
    case 'batimentprive':
        this.typeCollect = 'batimentprive';
      console.log('afficher batimentprive');
      break;
    case 'pointeau':
          this.typeCollect = 'pointeau';
          console.log('afficher pointeau');
          break;
    default:
      console.log('Sorry, we are out of');
  }
}

filterByTypeCollect(selectedValue){
  console.log(selectedValue);
    this.typeDeCollecte = selectedValue;
    this.collectes.getAllCollectesbyfiltersforAdmin(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, this.typeDeCollecte);
    this.zoom = Number(6); 
}

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `${result}`;
    
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

popupExportCsv(collecteType){
  let collectes;
  switch (collecteType) {
    case 'batimentpublic':
       collectes = this.markers.filter( (it) => {
        return it.typecollecte == collecteType;
      });
      this.exportBpublicCsv(collecteType,  collectes);
      break;
    case 'latrine':
         collectes = this.markers.filter( (it) => {
          return it.typecollecte == collecteType;
        });
        this.exportLatrineCsv(collecteType,  collectes);
        break;
    case 'danger':
        collectes = this.markers.filter( (it) => {
          return it.typecollecte == collecteType;
        });
        this.exportDangerCsv(collecteType,  collectes);
      break;
    case 'batimentprive':
        collectes = this.markers.filter( (it) => {
          return it.typecollecte == collecteType;
        });
        this.exportBpriveCsv(collecteType,  collectes);
      break;
    case 'pointeau':
        collectes = this.markers.filter( (it) => {

          return it.typecollecte == collecteType;
        });
        this.exportPointEauCsv(collecteType,  collectes);
          break;
    default:
      console.log('Sorry, we are out of');
  }
}

orderKeys(obj, keys){
  const newObj = {};
  for(let key of keys){


    if( obj[key]  === true ){
        newObj[key] = "OUI";
   }else{
     if(obj[key]  === false)
     {
      newObj[key] = "NON";
     }
     else{
       newObj[key] = obj[key]; 
     }
   }
    
  }
  return newObj;
}

exportDangerCsv(collecteType,  collectes){
  const exportCollectes = [];
  collectes.forEach((item) => {
      exportCollectes.push(this.orderKeys(item, this.keysDangers));
  });  
  var date = new Date(Date.now());
  const options = { 
    fieldSeparator: ',',
    filename:'dangers-'+date.toLocaleDateString(),
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: false, 
    showTitle: true,
    title: 'Catégorie Collecte: '+collecteType+'-'+ localStorage.getItem('administrateur')+'-'+ Date.now(),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
 
const csvExporter = new ExportToCsv(options);
csvExporter.generateCsv(exportCollectes);
}

exportBpriveCsv(collecteType,  collectes){
  const exportCollectes = [];
  collectes.forEach((item) => {
      exportCollectes.push(this.orderKeys(item, this.keysBaptimentPrive));
  });  
  var date = new Date(Date.now());
  const options = { 
    fieldSeparator: ',',
    filename:'batprivs-'+date.toLocaleDateString(),
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: false, 
    showTitle: true,
    title: 'Catégorie Collecte: '+collecteType+'-'+ localStorage.getItem('administrateur')+'-'+ Date.now(),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
 
const csvExporter = new ExportToCsv(options);
csvExporter.generateCsv(exportCollectes);
}

exportBpublicCsv(collecteType,  collectes){
  const exportCollectes = [];
  collectes.forEach((item) => {
      exportCollectes.push(this.orderKeys(item, this.keysBaptimentPublic));
  });  
  var date = new Date(Date.now());
  const options = { 
    fieldSeparator: ',',
    filename: 'batpubs-'+date.toLocaleDateString(),
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: false, 
    showTitle: true,
    title: 'Catégorie Collecte: '+collecteType+'-'+ localStorage.getItem('administrateur')+'-'+ Date.now(),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
 
const csvExporter = new ExportToCsv(options);
csvExporter.generateCsv(exportCollectes);
}

exportLatrineCsv(collecteType,  collectes){
  const exportCollectes = [];
  collectes.forEach((item) => {
      exportCollectes.push(this.orderKeys(item, this.keysLatrine));
  });  
  var date = new Date(Date.now());
  const options = { 
    fieldSeparator: ',',
    filename:'latrines-'+date.toLocaleDateString(),
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: false, 
    showTitle: true,
    title: 'Catégorie Collecte: '+collecteType+'-'+ localStorage.getItem('administrateur')+'-'+ Date.now(),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
 
const csvExporter = new ExportToCsv(options);
csvExporter.generateCsv(exportCollectes);
}

exportPointEauCsv(collecteType,  collectes){
  const exportCollectes = [];
  collectes.forEach((item) => {
      exportCollectes.push(this.orderKeys(item, this.keysPointeau));
  });  
  var date = new Date(Date.now());
  const options = { 
    fieldSeparator: ',',
    filename:'pointeau-'+date.toLocaleDateString(),
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: false, 
    showTitle: true,
    title: 'Catégorie Collecte: '+collecteType+'-'+ localStorage.getItem('nomPartenaire')+'-'+ Date.now(),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
 
const csvExporter = new ExportToCsv(options);
 csvExporter.generateCsv(exportCollectes);
}


getRegions(){
  let data;
  data = this.regionsServices.getRegions().subscribe(
    (success)=>{
      this.regions = success.regions;
    }, 
    (error)=>{
      console.log(error);
    }
  );
}
filterByPartenaire(selectedvalue){
  this.partenaire = selectedvalue;
  this.collectes.getAllCollectesbyfiltersforAdmin(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, '');
  this.theRegion = '' ;
  this.theDepartement = '';
  this.theArrondissement = '';
  this.theCommune = '';

}

filterByRegion(selectedvalue){
  this.theRegion = selectedvalue;
  this.collectes.getAllCollectesbyfiltersforAdmin(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, '');
  this.regions.forEach((element) => {
    if (element.nom.localeCompare(this.theRegion)===0){
      this.departements = element.departements;
    }
 });
  this.theDepartement = '';
  this.theArrondissement = '';
  this.theCommune = '';

}

filterByDepartement(selectedvalue){
console.log(selectedvalue);
this.theDepartement = selectedvalue;
this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, '');
this.departements.forEach((element) => {
  if (element.nom.localeCompare(this.theDepartement)===0){
    this.arrondissements = element.arrondissements;
    this.theArrondissement = '';
    this.theCommune = '';
  }
})
this.theArrondissement = '';
this.theCommune = '';

}

filterByArrondissement(selectedvalue){
this.theArrondissement = selectedvalue;
this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, '');
this.arrondissements.forEach((element) => {
this.theCommune = '';
  if (element.nom.localeCompare(this.theArrondissement)===0){
    this.communes = element.communes;
  }
})

}

filterByCommune(selectedvalue){
this.theCommune = selectedvalue;
this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, '');
}
filterByVillage(selectedvalue){
this.theVillage = selectedvalue;
this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, '');
}

getCompteur(){
  this.collectes.getCollectesCompteurPointDeauAdmin().subscribe(
    (docData)=>{
      this.countPointeau = docData.size;
    }
  );

  this.collectes.getCollectesCompteurDangerAdmin().subscribe(
    (docData)=>{
      this.countDanger = docData.size;
    }
  );

  this.collectes.getCollectesCompteurLatrineAdmin().subscribe(
    (docData)=>{
      this.countLatrine = docData.size;
    }
  );

  this.collectes.getCollectesCompteurBaptimentPriveAdmin().subscribe(
    (docData)=>{
      this.countBaptimentPrive = docData.size;
    }
  );

  this.collectes.getCollectesCompteurBaptimentPublicAdmin().subscribe(
    (docData)=>{
      this.countBaptimentPublic = docData.size;
    }
  );
}


onPage(val){
  this.typeCollect = val;
}

  dashboard(){
    this.router.navigate(['adminHome']);
  }
  ngOnDestroy(){

  }

  logout(){
    this.adminService.logout();
  }
}



export interface Region {
  nom:          string;
  departements: Departement[];
}

export interface Departement {
  nom:             string;
  arrondissements: Arrondissement[];
}

export interface Arrondissement {
  nom:      string;
  communes: Commune[];
}

export interface Commune {
  nom: string;
}