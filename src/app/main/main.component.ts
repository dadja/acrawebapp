import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin.model';
import {Subscription } from 'rxjs';
import { AdminAuthService} from '../services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'acra-App';
  admins;
  AdminSubscription: Subscription;


  constructor(private admin: AdminAuthService, private router: Router){
  }

  ngOnInit() {
    // this.admin.getAllSuperAdmin();
    // this.AdminSubscription = this.admin.superAdminSubject.subscribe(
    //   (admins: Admin[]) => {
    //     //this.books = books;

    //     this.admins = Object.keys(admins).map(i => admins[i])
    //     console.log(this.admins);
    //   }
    // );
  }

  onLoggin() {
      this.router.navigate(["login"]);
  }




  

}
