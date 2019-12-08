import { Component, OnDestroy, OnInit } from '@angular/core';
import {AdminAuthService} from 'src/app/services/admin-auth.service';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs';
import { Admin } from './models/admin.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from "@angular/fire/auth";

//import { tap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnDestroy{
  email;
  password;
  constructor(public authenticationService: AuthService, private angularFireAuth: AngularFireAuth) {
    console.log('bia');
    this.signIn();
  }

  

  signIn() {
    this.email = ''; //UserLogin firebase Auth
    this.password = ''; //Password firebase User Auth

    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  signOut() {
    this.authenticationService.SignOut();
  }

  ngOnDestroy(): void{
    this.signOut();
  }
}
  