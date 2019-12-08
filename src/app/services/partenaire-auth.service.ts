import { Injectable } from '@angular/core';
import {Partenaire} from 'src/app/models/partenaire.model';
import {Subject, BehaviorSubject} from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
// import { NgxIndexedDB } from 'ngx-indexed-db';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartenaireAuthService {

  partenaire: Partenaire[] = [];
  partenaireSubject = new Subject<Partenaire[]>();
  partenaireData = new Subject<any>(); //il renvoie les données admin quand connecté ou non
  partenaireConnectedSubject = new BehaviorSubject<Boolean>(false); //il renvoie true or false pour dire si l'admin est connecté ou non
  //superAdminConnectedSubject.next(false);

  //localDB= new NgxIndexedDB('myDB',1);

  constructor(private db: AngularFirestore, private modalService: NgbModal, private router: Router) {
    // this.localDB.openDatabase(1, evt => {
    //   let objectStore = evt.currentTarget.result.createObjectStore('partenaire', {keyPath: 'id'});
    
    //       objectStore.createIndex('nom','nom', { unique: false});
    //       objectStore.createIndex('prenom', 'prenom', {unique: false});
    //       objectStore.createIndex('adminId', 'adminId', {unique: false});
    //       objectStore.createIndex('adresse', 'adresse', {unique: false});
    //       objectStore.createIndex('couleur_primaire', 'couleur_primaire', {unique: false});
    //       objectStore.createIndex('id', 'id', {unique: true});
    //       objectStore.createIndex('logoUrl', 'logoUrl', {unique: false});
    //       objectStore.createIndex('mdp', 'mdp', {unique: false});
    //       objectStore.createIndex('paysResidence', 'paysResidence', {unique: false});
    //       objectStore.createIndex('firstConn', 'firstConn', {unique: false});
          
    
    //       console.log('Objet Créé');
  
    
        
    //     });
  }


  addPartenaire(prenom: string, nom: string, id: string, paysResidance: string, mdp: string, adresse: string, logoUrl: string, couleur_primaire: string, nomAgence: string, adminId: string) {
  
    var doc = this.db.collection('partenaires').doc(id);
  doc.get().subscribe((docData) => {
    if (docData.exists) {
      const admin = docData.data();
      admin['id'] = id;
      console.log(admin);
      console.log('Un utilisateur possède déjà cette adresse email');
    } else {
      console.log(id);
      this.db.collection('partenaires').doc(id).set({ nom: nom, prenom: prenom, paysResidance: paysResidance, adresse: adresse, logoUrl: logoUrl, couleur_primaire: couleur_primaire, mdp: mdp, firstConn: 'true', actif: true, nomPartenaire: nomAgence, adminId: adminId }).then(
        ()=> {this.getAllPartenaire()}
      ).catch(
        (error) => {console.log(error)}
      );

    }
  });
  }


  updatePartenaire(id: string, nom: string, prenom: string, paysResidance: string, adresse: string, logoUrl: string, couleur_primaire: string, mdp: string, adminId: string) {
  
    var doc = this.db.collection('partenaires').doc(id);
  doc.get().subscribe((docData) => {
    if (docData.exists) {
      const data = docData.data();
      data['id'] = id;
      this.db.collection('partenaires').doc(id).set({ nom: nom, prenom: prenom, paysResidance: paysResidance, adresse: adresse, logoUrl: logoUrl, couleur_primaire: couleur_primaire, mdp: mdp, adminId: adminId }, {merge:true}).then((ok) =>{this.getAllPartenaire();}).catch((error)=>{console.log(error)});
    } else {
      console.log('cet administrateur n existe pas' );
    }
  });
  
  }

  updatePartenaire1(id: string, nomPartenaire: string, nom: string, prenom: string, paysResidance: string, adresse: string, logoUrl: string, couleur_primaire: string, mdp: string, adminId: string) {
  
    var doc = this.db.collection('partenaires').doc(id);
  doc.get().subscribe((docData) => {
    if (docData.exists) {
      const data = docData.data();
      data['id'] = id;
      this.db.collection('partenaires').doc(id).set({ nom: nom, nomPartenaire: nomPartenaire, prenom: prenom, paysResidance: paysResidance, adresse: adresse, logoUrl: logoUrl, couleur_primaire: couleur_primaire, mdp: mdp, adminId: adminId }, {merge:true}).then((ok) =>{this.getAllPartenaire();}).catch((error)=>{console.log(error)});
    } else {
      console.log('cet administrateur n existe pas' );
    }
  });
  
  }

  updatepartenaireActif(id:string, actif:boolean){
    var doc = this.db.collection('partenaires').doc(id);
    doc.get().subscribe((docData) => {
      if (docData.exists) {
        const data = docData.data();
        data['id'] = id;
        this.db.collection('partenaires').doc(id).set({ actif: actif}, {merge:true}).then((ok) =>{this.getAllPartenaire();}).catch((error)=>{console.log(error)});
      } else {
        console.log('cet administrateur n existe pas' );
      }
    });
  }

  // Methode pour afficher tous les super admin
getAllPartenaire(){
this.db.collection('partenaires')
.get()
.subscribe((snapshot) =>{
  snapshot.forEach(doc => {
    const parto = doc.data();
    parto.id=doc.id;
    const partenaire = new Partenaire();
    partenaire.id = parto.id;
    partenaire.actif = parto.actif;
    partenaire.mdp = parto.mdp;
    partenaire.nom = parto.nom;
    partenaire.prenom = parto.prenom;
    partenaire.paysResidance = parto.paysResidance;
    partenaire.adresse = parto.adresse;
    partenaire.nomPartenaire = parto.nomPartenaire;
    partenaire.couleur_primaire = parto.couleur_primaire;
    partenaire.logoUrl = parto.logoUrl;
    partenaire.adminId = parto.adminId;
    this.partenaire.push(partenaire); 
    //console.log('dans le service admin', administrateur);
    this.emitPartenaire();
  });
  this.partenaire = [];
});
console.log(this.partenaire);

}

getPartenaire(email, pwd, role) {
 console.log(role); 
  if(role.localeCompare('partenaire')!==0){
    environment.errorMessage == 'Votre compte n\'est pas un compte partenaire';
    } else {
  
  // const connected : boolean = true;
  var doc = this.db.collection('partenaires').doc(email);
  doc.get().subscribe((docData) => {
    if (docData.exists) {
      const data = docData.data();
      data['id'] = email;
      console.log(pwd);
      console.log(data.mdp);
      console.log(data);

      if(data.actif === true){
        if (pwd.localeCompare(data.mdp) === 0) {
          console.log('mdp input:' + pwd, '  mdp database:' + data.mdp );
          environment.loading = false;  
          const connected : boolean = true;
         
          
          this.emitPartenaireConnected(connected); //il emet le booléen pour dire si le user à été authentifié
          this.emitPartenaireData(data); //il emet les données de l'utilisateur connecté
          //console.log('Un utilisateur possède déjà cette adresse email');
          console.log(data);
          }else {
            const connected: boolean = false;
            environment.loading = false;
            const data = 'empty';
            console.log('mauvais mot de passe');
            environment.loading = false;
            environment.errorMessage = 'Mot de passe est incorrect';
            this.emitPartenaireConnected(connected);
            this.emitPartenaireData(data);
          }
      } else {
        const data = {};
        const connected: boolean = false;
        environment.loading = false;
        environment.errorMessage = 'Votre Compte a été désactivé, veuillez contacter l\'administrateur';
        this.emitPartenaireConnected(connected);
        this.emitPartenaireData(data);
      }
      
      
    } else {
      const data = {};
      const connected: boolean = false;
      environment.loading = false;
      environment.errorMessage = 'Ce compte n\'existe pas.';
      this.emitPartenaireConnected(connected);
      this.emitPartenaireData(data);
      //console.log('');
      // const message = 'Il n\'existe pas de compte avec cette adresse mail.'
      // const modalRef = this.modalService.open(ModalComponent);
      // modalRef.componentInstance.message = message;
    }
  },
  (error)=> {
    environment.errorMessage = 'Problème de connection. Vérifiez votre connection et essayez à nouveau.'
    // const modalRef = this.modalService.open(ModalComponent);
    // modalRef.componentInstance.message = message;
    console.log(error);
  });
}


  

  
}

getDataPartenaire(email){
  var doc = this.db.collection('partenaires').doc(email);
   return doc.get()
}

deleteSuperAdmin(email) {
  this.db.collection('topAdmins').doc(email).delete().then(
    (ok) => {
      console.log(ok);
    }
  ).catch((error)=>{
    console.log(error);
  }
  );

}

effacerTout(){
  window.localStorage.clear();
  
}
logout(){
const asyncClearLocalStorage = {
  clear: function () {
      return Promise.resolve().then(function () {
          localStorage.clear();
      });
  }
}
  
this.emitPartenaireConnected(false);
const data = {};
this.emitPartenaireData(data);
asyncClearLocalStorage.clear().then(()=>{
  this.router.navigate(['login']);
});

}
// isPartenaireexist(id){
//   var doc = this.db.collection('topAdmins').doc(id);
//   doc.get().subscribe((docData) => {
//     if (docData.exists) {
//       this.router.navigate(['partenaireHome']);
//     } else {
//       this.router.navigate(['auth']);
//       localStorage.removeItem("nom");
//       localStorage.removeItem("prenom");
//       localStorage.removeItem("role");
//       localStorage.removeItem("id");
//     }
//   })
// }

emitPartenaire() {
  this.partenaireSubject.next(this.partenaire);
}
emitPartenaireConnected(data){
  this.partenaireConnectedSubject.next(data);
}
emitPartenaireData(data){
  this.partenaireData.next(data);
}
}
