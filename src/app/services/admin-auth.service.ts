import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import {Subject, BehaviorSubject} from 'rxjs';
import { Admin } from '../models/admin.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  superAdmin: Admin[] = [];
  superAdminSubject = new Subject<Admin[]>();
  superAdminData = new Subject<any>(); //il renvoie les données admin quand connecté ou non
  superAdminConnectedSubject = new BehaviorSubject<Boolean>(false); //il renvoie true or false pour dire si l'admin est connecté ou non
  //superAdminConnectedSubject.next(false);

  constructor(private db: AngularFirestore, private modalService: NgbModal, private router: Router) {
  }


  addSuperAdmin(nom: string, prenom: string, email: string, mdp: string) {
  
    var doc = this.db.collection('topAdmins').doc(email);
  doc.get().subscribe((docData) => {
    if (docData.exists) {
      const admin = docData.data();
      admin['id'] = email;
      console.log(admin);
      alert('Un utilisateur possède déjà cette adresse email');
    } else {
      this.db.collection('topAdmins').doc(email).set({ nom: nom, prenom: prenom, mdp: mdp }).then(
        ()=> {this.getAllSuperAdmin()}
      ).catch(
        (error) => {console.log(error)}
      );

    }
  });
  }


  updateSuperAdmin(nom: string, prenom: string, email: string, mdp: string) {
  
    var doc = this.db.collection('topAdmins').doc(email);
  doc.get().subscribe((docData) => {
    if (docData.exists) {
      const data = docData.data();
      data['id'] = email;
      this.db.collection('topAdmins').doc(email).set({ nom: nom, prenom: prenom, mdp: mdp }).then((ok) =>{this.getAllSuperAdmin();}).catch((error)=>{console.log(error)});
       
    } else {
      alert('cet administrateur n\'existe pas' );
    }
  });
  
  }

  // Methode pour afficher tous les super admin
getAllSuperAdmin(){
this.db.collection('topAdmins')
.get()
.subscribe((snapshot) =>{
  snapshot.forEach(doc => {
    const admin = doc.data();
    admin['id']=doc.id;
    const administrateur = new Admin();
    administrateur.id = admin.id;
    administrateur.mdp = admin.mdp;
    administrateur.nom = admin.nom;
    administrateur.prenom = admin.prenom;
    this.superAdmin.push(administrateur); 
    //console.log('dans le service admin', administrateur);
    this.emitSuperAdmin();
    this.superAdmin = [];
  });
});
console.log(this.superAdmin);

}

getSuperAdmin(email, pwd, role) {
  console.log(role);
  if(role.localeCompare('admin')!==0){
    environment.errorMessage == 'Votre compte n\'est pas un compte Administrateur';
    } else {

        var doc = this.db.collection('topAdmins').doc(email);
        doc.get().subscribe((docData) => {
          if (docData.exists) {
            let data = docData.data();
            data['id'] = email;
            console.log(pwd);
            console.log(data.mdp);
            if (pwd.localeCompare(data.mdp) === 0) {
            console.log('mdp input:' + pwd, '  mdp database:' + data.mdp );
            const connected : boolean = true;
            environment.loading = false;
            this.emitSuperAdminConnected(connected); //il emet le booléen pour dire si le user à été authentifié
            this.emitSuperAdminData(data); //il emet les données de l'utilisateur connecté
            data = {};
            //console.log('Un utilisateur possède déjà cette adresse email');

            console.log(data);
            }else {
              const connected: boolean = false;
              const data = 'empty';
              console.log('mauvais mot de passe');
              environment.loading = false;
              environment.errorMessage = 'Mot de passe est incorrect';
              this.emitSuperAdminConnected(connected);
              this.emitSuperAdminData(data);
            }
            
          } else {
            const data = {};
            const connected: boolean = false;
            environment.loading = false;
            environment.errorMessage = 'Ce compte n\'existe pas.';
            this.emitSuperAdminConnected(connected);
            this.emitSuperAdminData(data);
            //console.log('');
            // const message = 'Il n\'existe pas de compte avec cette adresse mail.'
            // const modalRef = this.modalService.open(ModalComponent);
            // modalRef.componentInstance.message = message;
          }
        },
        (error)=> {
          // alert('Problème de connection. Vérifiez votre connexion et essayez à nouveau.');
          environment.errorMessage = 'Problème de connection. Vérifiez votre connection et essayez à nouveau.'

          console.log(error);
        });
      }

  
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


logout(){
  const asyncClearLocalStorage = {
    clear: function () {
        return Promise.resolve().then(function () {
            localStorage.clear();
        });
    }
  }
  this.emitSuperAdminConnected(false);
  const data = {};
  this.emitSuperAdminData(data);
  asyncClearLocalStorage.clear().then(()=>{
    this.router.navigate(['login']); 
  })
  
}

// isAdminexist(id){
//   var doc = this.db.collection('topAdmins').doc(id);
//   doc.get().subscribe((docData) => {
//     console.log('resultat requete firebase', docData);
//     if (docData.exists) {
//       const data = docData.data();
//       data['id'] = id;
//       this.emitSuperAdminData(data);
//       this.router.navigate(['adminHome']);
//     } else {
//       this.router.navigate(['auth']);
//       localStorage.removeItem("nom");
//       localStorage.removeItem("prenom");
//       localStorage.removeItem("role");
//       localStorage.removeItem("id");
//     }
//   })
// }




emitSuperAdmin() {
  this.superAdminSubject.next(this.superAdmin);
}
emitSuperAdminConnected(data){
  this.superAdminConnectedSubject.next(data);
}
emitSuperAdminData(data){
  this.superAdminData.next(data);
}
}
