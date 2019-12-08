import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollecteurService {
  collecteurs = [];
  collecteurs$ = new Subject<any[]>();
  constructor(private db: AngularFirestore) { }

  getAllcollecteur(){
    this.db.collection('collecteur')
    .get()
    .subscribe((snapshot) =>{
      snapshot.forEach(doc => {
       //console.log(doc);
       let data = doc.data();
       data.id = doc.id;
       console.log(data);
       this.collecteurs.push(data);
       this.collecteurs$.next(this.collecteurs);
       this.collecteurs = [];
      });
    });
}


getAllCollecteursByPartenaires(){
  var doc = this.db.collection('collecteur', ref => ref.where('partenaire', '==', localStorage.getItem('administrateur')));
  
  doc.get().subscribe((docData) => {
    docData.forEach(doc => {
      const collecte = doc.data();
      
      collecte.id = doc.id;
      this.collecteurs.push(collecte);
      this.collecteurs$.next(this.collecteurs);
      this.collecteurs = [];
    })
  })
  console.log(this.collecteurs);
}

addCollecteur(data) {
  console.log(data);
  //var doc = this.db.collection('collecteur',  ref => ref.where('email', '==', data.email));
  var doc = this.db.collection('collecteur');
  doc.get().subscribe((docData) => {
    console.log(docData);
    docData.forEach(doc => {
      console.log(doc);
    
       const collecteur = doc.data();
       collecteur.id = doc.id;
       this.collecteurs.push(collecteur);
       console.log(this.collecteurs);
       
      });
      console.log(this.collecteurs);
      var alreadyCollecteur; //variable pour verifier si le collecteur qu on essaie de creer existe deja.
      for (var i = 0; i<=this.collecteurs.length - 1; i++){
        const mail = this.collecteurs[i].email;
        if (mail.localeCompare(data.email)===0){
          console.log('il existe deja un collecteur avec cette adresse la');
          alreadyCollecteur = 'true';
          break;
        } else {
          alreadyCollecteur = 'false';
        }
      }
      if (alreadyCollecteur.localeCompare('false')===0) {
        this.db.collection('collecteur').add({ nom: data.nom, prenom: data.prenom, email:data.email, tel: data.tel, partenaire: data.partenaire, deviceId: data.deviceId});
        alert('collecteur ajoute');
      } else {
        alert('Une erreur s\'est produite, veuillez recommencer l ajout du collecteur');
      }
      this.collecteurs = [];
    })
    
  }  

  updateCollecteur(updateCollecteur, updatenom, updateprenom, updateemail, updatetel){
    var doc = this.db.collection('collecteur').doc(updateCollecteur.id);
    doc.get().subscribe((docData) => {
      console.log(docData.data());
      const data = docData.data();
      if(docData.exists){
        this.db.collection('device').doc(updateCollecteur.id).set({ nom: updatenom, prenom: updateprenom, email: updateemail, tel: updatetel}, {merge: true});
        console.log('on call get devices');
        this.getAllCollecteursByPartenaires();
       }
    } );
  }

  updateAssocierCollecteur(id, deviceId, deviceunic) {
    console.log('update collecteur');
    //var doc = this.db.collection('collecteur',  ref => ref.where('email', '==', data.email));
    var doc = this.db.collection('collecteur').doc(id);
    doc.get().subscribe((docData) => {
      console.log(docData.data());
      const data = docData.data();
      if(docData.exists){
        this.db.collection('collecteur').doc(id).update({ email: data.email, nom: data.nom, partenaire: data.partenaire, prenom: data.prenom, tel: data.tel, deviceId: deviceId, deviceNumber: deviceunic });
        this.getAllCollecteursByPartenaires();
       }
    } ); 
  
  }

  updateDissocierCollecteur(collecteurId) {
    console.log('update dessocier device');
    //var doc = this.db.collection('collecteur',  ref => ref.where('email', '==', data.email));
    var doc = this.db.collection('collecteur').doc(collecteurId);
    doc.get().subscribe((docData) => {
      console.log(docData.data());
      const data = docData.data();
      if(docData.exists){
        this.db.collection('collecteur').doc(collecteurId).update({ email: data.email, nom: data.nom, partenaire: data.partenaire, prenom: data.prenom, tel: data.tel, deviceId: '', deviceNumber: '' });
        this.getAllCollecteursByPartenaires();
       }
    } ); 
  }
  

  // updatePartenaireDevice(id, data){
  //   var doc = this.db.collection('collector').doc(id);
  //   doc.get().subscribe((docData) => {
  //     if (docData.exists) {
  //       const data = docData.data();
  //       data['id'] = id;
  //       this.db.collection('partenaires').doc(id).set().then((ok) =>{/*this.getAllPartenaire();}).catch((error)=>{console.log(error)*/});
         
  //     } else {
  //       console.log('cet administrateur n existe pas' );
  //     });
  //   }
  // }
}




