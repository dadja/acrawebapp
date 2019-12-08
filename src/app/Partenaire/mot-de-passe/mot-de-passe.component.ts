import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PartenaireAuthService } from 'src/app/services/partenaire-auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mot-de-passe',
  templateUrl: './mot-de-passe.component.html',
  styleUrls: ['./mot-de-passe.component.css']
})
export class MotDePasseComponent implements OnInit {

  loginForm = new FormGroup({
    newMdp: new FormControl(''),
    confirmedMdp: new FormControl(''),
  });

  logo;
  constructor(private partenaireService: PartenaireAuthService, private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.logo = localStorage.getItem('logo');
  }

  onSubmit(){
    const id = localStorage.getItem('administrateur');
    const data = this.loginForm.value;
    if (data.newMdp.localeCompare(data.confirmedMdp) === 0) {
      var doc = this.db.collection('partenaires').doc(id);
      doc.get().subscribe((docData) => {
        if (docData.exists) {
          const contentDoc = docData.data();
          console.log(contentDoc);
          //data['id'] = id;
          contentDoc['firstConn']="false";
          contentDoc['mdp'] = data.newMdp;
          this.db.collection('partenaires').doc(id).set(contentDoc).then((ok) =>{ console.log('mise a jour ok')}).catch((error)=>{console.log(error)});
          this.router.navigate(['partenaireHome']);
        }
      });

  }

}

}
