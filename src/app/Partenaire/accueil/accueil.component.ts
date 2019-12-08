import { Component, OnInit, OnDestroy } from '@angular/core';
import '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { CollectesService } from 'src/app/services/collectes.service';
import { ExportToCsv } from 'export-to-csv';
import { RegionsService } from 'src/app/services/regions.service';
import { Data } from '@agm/core/services/google-maps-types';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  partenaire = localStorage.getItem('administrateur');
  regions: Region [];
  departements:  Departement[];
  arrondissements: Arrondissement[];
  communes: Commune[];

  regionMarkers ;
  departementMarkers;
  arrondissementMarkers;
  communeMarkers;
  step = 'region';

  searchText;

  countLatrine;  
  countDanger;
  countPointeau;
  countBaptimentPrive;
  countBaptimentPublic;

  regionDisabled;
  departementDisabled;
  arrondissementDisabled;
  communeDisabled;

  theRegion = '';
  theDepartement = '';
  theArrondissement = '';
  theCommune = '';
  theVillage = '';

  collecteSubscribtion;
  filterTypeCollect;
  latitude = 14.6937;
  longitude = -17.44406 ;
  mapType = 'satellite';
  zoom = 6;
  buttonCsv;
  mySelectedValue;
  typeDeCollecte;
  typeCollect = ''; //variable pour faire le check sur le type de collecte pour l'affichage
  page = ''; //variable pour gerer les differents component dans l espace partenaire
  safeMarkers; //markers tampons
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    // { latitude: 14.7117151,longitude: -17.4536784, alpha: 1 },
    // { latitude: 14.750152, longitude: -17.4754768, alpha: 1  },
    
  ]
  parentMarker;
  collecteSubscription: Subscription;
  lesCollectes;
  selectedMarker;
  color;

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
    'nomd',
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
  
  constructor(private modalService: NgbModal, private collectes: CollectesService, private regionsServices: RegionsService) { }

  ngOnInit() {
        this.map = true;
        this.color = localStorage.getItem('color');
        // this.collectes.getAllCollectesByPartenaires();
        this.collectes.getAllCollectesbyfilters(this.partenaire,this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, this.typeDeCollecte);
        this.getCompteur();
        this.getRegions();
     
    
    
    
    //this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, '');
    this.collecteSubscribtion = this.collectes.collectes$.subscribe(
    (values)=> {
      console.log('la valeur qui sort du subject', values);
      this.markers = values;
      console.log('les marqueurs', this.markers);
      this.safeMarkers = this.markers;
      
      //on garde l ensemble des markers dans un tableau pour l utiliser plus tard au besoin
    }
    );

  }


  changeMap(event){
    console.log(event.target.value);
    this.map = (this.map == true) ? false : true;
    this.mapType = (this.map == true) ? "satellite" : "roadmap";
  }
  

  getCompteur(){
    this.collectes.getCollectesCompteurPointDeau().subscribe(
      (docData)=>{
        console.log(docData);
        this.countPointeau = docData.size;
        console.log(this.countPointeau);
      }
    );
    // this.markers.forEach((value) => {
    //   const typeCollecte = value.typecollecte;
    //   if (typeCollecte.localeCompare('pointeau')===0){
    //     this.countPointeau = this.countPointeau + 1;
    //     console.log('compteur point eau',this.countPointeau);
    //   }
    // });
    

    this.collectes.getCollectesCompteurDanger().subscribe(
      (docData)=>{
        this.countDanger = docData.size;
        console.log(this.countDanger);
      }
    );

    this.collectes.getCollectesCompteurLatrine().subscribe(
      (docData)=>{
        this.countLatrine = docData.size;
        console.log(this.countLatrine);
      }
    );

    this.collectes.getCollectesCompteurBaptimentPrive().subscribe(
      (docData)=>{
        this.countBaptimentPrive = docData.size;
        console.log(this.countBaptimentPrive);
      }
    );

    this.collectes.getCollectesCompteurBaptimentPublic().subscribe(
      (docData)=>{
        this.countBaptimentPublic = docData.size;
        console.log(this.countBaptimentPublic);
      }
    );
  }

  selectMarker(event) {
    console.log(event);
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      id: event.title,
    };
  
    this.markers.forEach(
      (marker)=>{
        if (this.selectedMarker.id === marker.id){
          this.typeCollect = marker.typecollecte;
          console.log(this.typeCollect);
          this.checkTypeCollecte(this.typeCollect);
          this.parentMarker = marker;
        }
      }
    );
    
  
    console.log(this.selectedMarker.lat);
  
    console.log(this.selectedMarker);
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
  


  //methode qui verifie le type de collecte
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
        console.log('afficher danger');
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case 'batimentprive':
          this.typeCollect = 'batimentprive';
        console.log('afficher batimentprive');
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      case 'pointeau':
            this.typeCollect = 'pointeau';
            console.log('afficher pointeau');
            // expected output: "Mangoes and papayas are $2.79 a pound."
            break;
      default:
        console.log('Sorry, we are out of');
    }
  }
  
  
  filterByTypeCollect(selectedValue){
    console.log(selectedValue);
      this.typeDeCollecte = selectedValue;
      this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, this.typeDeCollecte);
     
  }

  

  filterByRegion(selectedvalue){
      console.log(selectedvalue);
      this.theRegion = selectedvalue;
      this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, this.typeDeCollecte);
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
    this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, this.typeDeCollecte);
    this.departements.forEach((element) => {
      if (element.nom.localeCompare(this.theDepartement)===0){
        this.arrondissements = element.arrondissements;
        //this.regionDisabled = true;
        this.theArrondissement = '';
        this.theCommune = '';
      }
    })
    this.theArrondissement = '';
    this.theCommune = '';
    
  }

  filterByArrondissement(selectedvalue){
    console.log(selectedvalue);
    //this.filterCollect();
    this.theArrondissement = selectedvalue;
    this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, this.typeDeCollecte);
    this.arrondissements.forEach((element) => {
    this.theCommune = '';
      if (element.nom.localeCompare(this.theArrondissement)===0){
        this.communes = element.communes;
        console.log(this.communes);
      }
    })

  }

  filterByCommune(selectedvalue){
    console.log(selectedvalue);
    this.theCommune = selectedvalue;
    this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, this.typeDeCollecte);
}
  filterByVillage(selectedvalue){
    console.log(selectedvalue);
    this.theVillage = selectedvalue;
    this.collectes.getAllCollectesbyfilters(this.partenaire, this.theRegion, this.theDepartement, this.theArrondissement, this.theCommune, this.theVillage, this.typeDeCollecte);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
      
      
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
  
  popupExportCsv(collecteType){
    console.log(collecteType);
    let collectes;

    switch (collecteType) {
      case 'batimentpublic':
         collectes = this.markers.filter( (it) => {
          return it.typecollecte == collecteType;
        });
        this.exportBpublicCsv(collecteType,  collectes);
        console.log(collectes);
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

      // if( typeof(obj[key])  === "boolean" ){
      //     if(obj[key] == true){
      //       newObj[key] = "OUI";
      //     }
      //     else{
      //       newObj[key] = "NON";
      //     }
      //  }else{
      //   newObj[key] = obj[key];
      //  }


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
     

        
        console.log(" value "+obj[key]+" is type of "+typeof(obj[key]));
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
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
 
const csvExporter = new ExportToCsv(options);
 console.log(exportCollectes);
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
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
 
const csvExporter = new ExportToCsv(options);
 console.log(exportCollectes);
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
    filename:'batpubs-'+date.toLocaleDateString(),
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: false, 
    showTitle: true,
    title: 'Catégorie Collecte: '+collecteType+'-'+ localStorage.getItem('administrateur')+'-'+ Date.now(),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
 
const csvExporter = new ExportToCsv(options);
 console.log(exportCollectes);
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
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
 
const csvExporter = new ExportToCsv(options);
 console.log(exportCollectes);
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
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
 
const csvExporter = new ExportToCsv(options);
 console.log(exportCollectes);
 csvExporter.generateCsv(exportCollectes);
}



  getRegions(){
    let data;
    data = this.regionsServices.getRegions().subscribe(
      (success)=>{
        this.regions = success.regions;
        console.log(this.regions);
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  onPage(val){
    console.log(val);
    this.typeCollect = val;
  }
  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.collecteSubscribtion.unsubscribe();
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