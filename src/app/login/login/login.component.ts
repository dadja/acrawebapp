import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { PartenaireAuthService} from 'src/app/services/partenaire-auth.service';
//import { Admin } from 'src/app/models/admin.model';
import { Router } from '@angular/router';
import {Subscription, Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';
import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';
import {environment} from 'src/environments/environment';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  superAdminSubscription: Subscription;
  superAdminDataSubscription: Subscription;
  superAdminData;
  superAdmin;
  superAdminId; 


  partenaireSubscription: Subscription;
  partenaireDataSubscription: Subscription;
  partenaireData;
  partenaire;
  //partenaireId;
  errorMessage;
  loading ;

  loginForm = new FormGroup({
    email: new FormControl(''),
    motDePasse: new FormControl(''),
    role: new FormControl(''),
  });
  constructor(private adminService: AdminAuthService, private partenaireService:PartenaireAuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.loading = environment.loading;
    environment.errorMessage = '';
    console.log(environment.errorMessage);
    const role = localStorage.getItem("role");
    if (role) {
      if (role === 'partenaire') {
        this.router.navigate(['partenaireHome']);
      } else if (role === 'admin'){
        this.router.navigate(['adminHome']);
      }
    } else {
      localStorage.clear();
    }

   
    // const role = localStorage.getItem("role");
    // //si il y a déjà des donnée dans le local storage
    // if (role){
    //   //on assigne a la variable role le contenu de la donnée role dans le local storage
    //   const role = sessionStorage.getItem("role");
    //   console.log(role);
    //   // si role egale a 'admin'
    //   if (role.localeCompare('admin') === 0 ){
    //     console.log('test de comapraison reussi', role);
    //     const id = localStorage.getItem("administrateur");
    //     console.log(id);
    //     this.adminService.isAdminexist(id);
    //   } else {
    //     console.log('alors c\'est un partenaire',role); 
    //     const id = localStorage.getItem("administrateur");
    //     this.partenaireService.isPartenaireexist(id);
    //   }
    // } else {
      // this.superAdminSubscription = this.adminService.superAdminConnectedSubject.subscribe(
      //   (connected)=>{
      //     console.log(connected);
      //   }
      //   //this.superAdminSubscription.pipe(take(1)).subscribe(value => this.superAdmin = value);
      // );
      // this.superAdminDataSubscription = this.adminService.superAdminData.subscribe(
      //   (adminData) => {
      //     console.log(adminData);
      //     this.superAdminData = adminData;
      //   }
      // )
    //}
   
  }

  onSubmit(){

    this.loading = environment.loading = true;
    this.errorMessage = environment.errorMessage = '';
    console.log(this.loginForm.value);
    const data = this.loginForm.value;
    console.log(data.role);
    const role = data.role;
    if (role.localeCompare('admin') === 0){
      console.log(data.role);
      
      this.loginAdmin(data);
    } 
    if (role.localeCompare('partenaire') === 0){
        // this.openModal('Nous allons faire une recherche chez les partenaires.');
       console.log('recherche chez les partenaires');
      this.loginParto(data);
    }
    if (role === ''){
      // alert('choisissez le type de compte');
      this.loading = environment.loading = false;
      environment.errorMessage = 'Choisissez le type de compte';
      this.errorMessage = environment.errorMessage;
    }
  
  }


  loginAdmin(data) {
    console.log(data);
    environment.errorMessage = ' ';
    this.adminService.getSuperAdmin(data.email, data.motDePasse, data.role);
    this.superAdminSubscription = this.adminService.superAdminConnectedSubject.subscribe(
      (data)=> {
        if (data === true){
          this.superAdminDataSubscription = this.adminService.superAdminData.subscribe(
            (user) => {
              console.log(user.id);
              localStorage.setItem("administrateur", user.id );
              localStorage.setItem("nom", user.nom);
              localStorage.setItem("prenom", user.prenom);
              localStorage.setItem("role", "admin");
              this.router.navigate(['adminHome']);
            } 
          );
        } 
        else {
          this.loading = environment.loading;
          this.errorMessage = environment.errorMessage;
          //alert('vous n\'etes pas partenaire');
        }
        // else {
        //   // alert('Vous n\'etes pas Administrateur');
        //   environment.errorMessage = 'choisissez le type de compte';
        //   this.errorMessage = environment.errorMessage;
        // }
      }
    );
    // this.superAdminDataSubscription = this.adminService.superAdminData.subscribe(
    //   (data)=>{
        
    //       console.log(data);
          
    //       //this.router.navigate(['adminHome']);
    //     // } else {
    //     //   //this.openModal('Vous n\'avez pas été authentifié, rééssayez encore.');
    //     //   console.log('tu bouge pas man');
    //     // }
    //   }
    // );
    } 

    loginParto(data) {
      console.log(data);
      environment.errorMessage = ' ';
      this.partenaireService.getPartenaire(data.email, data.motDePasse, data.role);
      this.partenaireSubscription = this.partenaireService.partenaireConnectedSubject.subscribe(
        (data)=> {
          if (data === true){
            this.partenaireDataSubscription = this.partenaireService.partenaireData.subscribe(
              (user) => {
                console.log(user.id);
                localStorage.setItem("administrateur", user.id );
                localStorage.setItem("nom", user.nom);
                localStorage.setItem("prenom", user.prenom);
                localStorage.setItem("role", "partenaire");
                localStorage.setItem("firstConn", user.firstConn);
                localStorage.setItem("logo", user.logoUrl);
                localStorage.setItem("nomPartenaire", user.nomPartenaire);
                localStorage.setItem("color", user.couleur_primaire);
                console.log(user.firstConn);
                const firstConnect = user.firstConn;
                if (firstConnect){
                  if(user.firstConn.localeCompare('true')=== 0){
                    this.router.navigate(['initialiser_mot_depasse']);
                  } else{
                  this.router.navigate(['partenaireHome']);
                }
                }
                
              }
            );
          } else {
            this.loading = environment.loading;
            this.errorMessage = environment.errorMessage;
            //alert('vous n\'etes pas partenaire');
          }
        }
      );
      this.superAdminDataSubscription = this.adminService.superAdminData.subscribe(
        (data)=>{
          
            console.log(data);
        }
      );
      }
  
  

  ngOnDestroy(){
    
    
  }


  unsubscribeAdmin(){
    this.superAdminDataSubscription.unsubscribe;
    this.superAdminSubscription.unsubscribe;
  }
  unsubscribePart(){
    this.partenaireDataSubscription.unsubscribe;
    this.partenaireSubscription.unsubscribe;
  }

  openModal(message){
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.message = message;
  }
}
