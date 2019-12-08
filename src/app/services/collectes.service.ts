import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject, Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectesService {

  collectes = [];
  collectes$ = new Subject<any[]>();


  constructor(private db: AngularFirestore) { }

  getAllcollectes(){
    this.db.collection('collecte')
    .get()
    .subscribe((snapshot) =>{
      snapshot.forEach(doc => {
       //console.log(doc);
       let data = doc.data();
       data.id = doc.id;
       data.date = data.date.toDate().toLocaleDateString();
        // var typecollecte = data.typecollecte;
        // var puitdateexploitation = data.puitdateexploitation;
      //  if (typecollecte.localeCompare('pointeau') !== 0){
      //   if (puitdateexploitation.localeCompare('') !== 0){
      //     data.puitdateexploitation = data.puitdateexploitation.todate().toLocaleDateString();
      //   }
      //   // if (data.foragedateexploitation === '' ) {
      //   //   data.foragedateexploitation = data.foragedateexploitation.todate().toLocaleDateString();
      //   // }
      // }

      if(data.typecollecte === 'pointeau'){
        // data.puitdateexploitation.toDate().toLocaleDateString();
        console.log('popo ca marche');
        if(data.puitdateexploitation !== ''){
          // console.log('popo ca marche1');
          data.puitdateexploitation = data.puitdateexploitation.toDate().toLocaleDateString();
          console.log('popo ca marche1 => ', data.puitdateexploitation );
        }
        if(data.foragedateexploitation !== ''){
          data.foragedateexploitation = data.foragedateexploitation.toDate().toLocaleDateString();
          console.log('popo ca marche2 => ', data.foragedateexploitation );

        }
      }
      

       this.collectes.push(data);
      //  console.log('apres le traitement',data)
       this.collectes$.next(this.collectes);
       
       //console.log(this.collectes);
        // admin['id']=doc.id;
        // const administrateur;
        // administrateur.id = admin.id;
        // administrateur.mdp = admin.mdp;
        // administrateur.nom = admin.nom;
        // administrateur.prenom = admin.prenom;
        // this.superAdmin.push(administrateur); 
        //console.log('dans le service admin', administrateur);
        
      });
    });
   
    this.collectes = [];
}



getAllCollectesByPartenaires(){
  console.log(localStorage.getItem('administrateur'));
  var doc = this.db.collection('collecte', ref => ref.where('partenaire', '==', localStorage.getItem('administrateur')));
  doc.get().subscribe((docData) => {

    console.log('data nombre total de collectes du partenaires',docData.size);
    docData.forEach(doc => {
      const collecte = doc.data();
      collecte.id = doc.id;
      collecte.region = collecte.region;
      collecte.departement = collecte.departement
      collecte.date = collecte.date.toDate().toLocaleDateString();
      
      if(collecte.typecollecte === 'pointeau'){
        if(collecte.puitdateexploitation !== ''){
        collecte.puitdateexploitation = collecte.puitdateexploitation.toDate().toLocaleDateString();
        }
        if(collecte.foragedateexploitation !== ''){
          collecte.foragedateexploitation = collecte.foragedateexploitation.toDate().toLocaleDateString();
        }
      }
      
      this.collectes.push(collecte);
      this.collectes$.next(this.collectes);
    })
  });
  this.collectes = [];
  console.log(this.collectes);
}


deleteCollecte(id){
  this.db.collection('collecte').doc(id).delete();
  this.getAllCollectesByPartenaires();
}


getAllCollectesbyfilters(partenaire, region,departement,arrondissement,commune,village,typecollecte) {
  
  console.log('getAllCollectesbyfilters execution started typecollecte'+typecollecte);
  let doc;
  // let refcollecte : firebase.firestore.CollectionReference;
    
  if(typecollecte != null && typecollecte != ""){

  if(partenaire != null && partenaire != "")
  {
    doc = this.db.collection('collecte', refcollecte => refcollecte
    .where('typecollecte','==',typecollecte)
    .where('partenaire', '==',partenaire ),).get();

    if(region != null && region != ""){
 
      doc = this.db.collection('collecte', refcollecte => refcollecte
      .where('typecollecte','==',typecollecte)
      .where('partenaire', '==',partenaire )
      .where('region','==',region),).get();

      if(departement != null && departement != ""){

        doc = this.db.collection('collecte', refcollecte => refcollecte
        .where('typecollecte','==',typecollecte)
        .where('partenaire', '==',partenaire )
        .where('region','==',region)
        .where('departement','==',departement),).get();

        if(arrondissement != null && arrondissement != ""){
          
          doc = this.db.collection('collecte', refcollecte => refcollecte
          .where('typecollecte','==',typecollecte)
          .where('partenaire', '==',partenaire )
          .where('region','==',region)
          .where('departement','==',departement)
          .where('arrondissement','==',arrondissement),).get();

          if(commune != null && commune != ""){
            doc = this.db.collection('collecte', refcollecte => refcollecte
            .where('typecollecte','==',typecollecte)
            .where('partenaire', '==',partenaire )
            .where('region','==',region)
            .where('departement','==',departement)
            .where('arrondissement','==',arrondissement)
            .where('commune','==',commune),).get();

            if(village != null && village != ""){

              doc = this.db.collection('collecte', refcollecte => refcollecte
              .where('typecollecte','==',typecollecte)
              .where('partenaire', '==',partenaire )
              .where('region','==',region)
              .where('departement','==',departement)
              .where('arrondissement','==',arrondissement)
              .where('commune','==',commune)
              .where('village','==',village),).get();
            }
          }
        }
      }
    }
  }
  

}
else{


  if(partenaire != null && partenaire != "")
  {
    doc = this.db.collection('collecte', refcollecte => refcollecte
    .where('partenaire', '==',partenaire ),).get();

    if(region != null && region != ""){
 
      doc = this.db.collection('collecte', refcollecte => refcollecte
      .where('partenaire', '==',partenaire )
      .where('region','==',region),).get();

      if(departement != null && departement != ""){

        doc = this.db.collection('collecte', refcollecte => refcollecte
        .where('partenaire', '==',partenaire )
        .where('region','==',region)
        .where('departement','==',departement),).get();

        if(arrondissement != null && arrondissement != ""){
          
          doc = this.db.collection('collecte', refcollecte => refcollecte
          .where('partenaire', '==',partenaire )
          .where('region','==',region)
          .where('departement','==',departement)
          .where('arrondissement','==',arrondissement),).get();

          if(commune != null && commune != ""){
            doc = this.db.collection('collecte', refcollecte => refcollecte
            .where('partenaire', '==',partenaire )
            .where('region','==',region)
            .where('departement','==',departement)
            .where('arrondissement','==',arrondissement)
            .where('commune','==',commune),).get();

            if(village != null && village != ""){

              doc = this.db.collection('collecte', refcollecte => refcollecte
              .where('partenaire', '==',partenaire )
              .where('region','==',region)
              .where('departement','==',departement)
              .where('arrondissement','==',arrondissement)
              .where('commune','==',commune)
              .where('village','==',village),).get();
            }
          }
        }
      }
    }
  }

}
  // console.log("refcollecte before "+doc.path);
  // if(typecollecte != null  && typecollecte != ""){
    // refcollecte = refcollecte.where('typecollecte','==','danger');//typecollecte
    // console.log("refcollecte after "+doc.path);
  // }
  

  doc.subscribe((docData) => {
    if(docData.size>0){
      console.log('!empty');
      docData.forEach(doc => {
        const collecte = doc.data();
        collecte.id = doc.id;
        collecte.date = collecte.date.toDate().toLocaleDateString();
         
      if(collecte.typecollecte === 'pointeau'){
        if(collecte.puitdateexploitation !== ''){
        collecte.puitdateexploitation = collecte.puitdateexploitation.toDate().toLocaleDateString();
        }
        if(collecte.foragedateexploitation !== ''){
          collecte.foragedateexploitation = collecte.foragedateexploitation.toDate().toLocaleDateString();
        }
      }
        this.collectes.push(collecte);
        this.collectes$.next(this.collectes);
      });
      this.collectes = [];
    }
    else{
      console.log('empty');
       this.collectes=[];
       this.collectes$.next(this.collectes);
    }
    
  });
  this.collectes = [];
  // console.log(this.collectes);
}

// getAllCollectesbyfilters(partenaire, region,departement,arrondissement,commune,village,typecollecte){
//   //partenaire, region, departement, arrondissement, commune, village, partenaire, typecollecte,
  
//   let doc;

//   if(partenaire != null && partenaire != "")
//   {
//     doc = this.db.collection('collecte', refcollecte => refcollecte
//     .where('partenaire', '==',partenaire ),).get();

//     if(region != null && region != ""){
 
//       doc = this.db.collection('collecte', refcollecte => refcollecte
//       .where('partenaire', '==',partenaire )
//       .where('region','==',region),).get();

//       if(departement != null && departement != ""){

//         doc = this.db.collection('collecte', refcollecte => refcollecte
//         .where('partenaire', '==',partenaire )
//         .where('region','==',region)
//         .where('departement','==',departement),).get();

//         if(arrondissement != null && arrondissement != ""){
          
//           doc = this.db.collection('collecte', refcollecte => refcollecte
//           .where('partenaire', '==',partenaire )
//           .where('region','==',region)
//           .where('departement','==',departement)
//           .where('arrondissement','==',arrondissement),).get();

//           if(commune != null && commune != ""){
//             doc = this.db.collection('collecte', refcollecte => refcollecte
//             .where('partenaire', '==',partenaire )
//             .where('region','==',region)
//             .where('departement','==',departement)
//             .where('arrondissement','==',arrondissement)
//             .where('commune','==',commune),).get();

//             if(village != null && village != ""){

//               doc = this.db.collection('collecte', refcollecte => refcollecte
//               .where('partenaire', '==',partenaire )
//               .where('region','==',region)
//               .where('departement','==',departement)
//               .where('arrondissement','==',arrondissement)
//               .where('commune','==',commune)
//               .where('village','==',village),).get();

//               if(typecollecte != null && typecollecte != ""){

//                 doc = this.db.collection('collecte', refcollecte => refcollecte
//                 .where('partenaire','==',partenaire)
//                 .where('region', '==',region )
//                 .where('department','==',departement)
//                 .where('arrondissement','==',arrondissement)
//                 .where('commune','==',commune)
//                 .where('village','==',village)
//                 .where('typecollecte','==',typecollecte),).get();

//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   // doc = this.db.collection('collecte', refcollecte => refcollecte,).get();
//   //  doc = this.db.collection('collecte', refcollecte => refcollecte
//   //                                                                 .where('region', '==',region )
//   //                                                                 .where('department','==',departement)
//   //                                                                 .where('arrondissement','==',arrondissement)
//   //                                                                 .where('commune','==',commune)
//   //                                                                 .where('village','==',village)
//   //                                                                 .where('partenaire','==',partenaire)
//   //                                                                 .where('typecollecte','==',typecollecte),).get();
   

//   // var doc = this.db.collection('collecte', ref => ref.where('partenaire', '==', localStorage.getItem('administrateur')));
//   doc.subscribe((docData) => {
//     if(docData.size>0){
//       console.log('!empty');
//       docData.forEach(doc => {
//         const collecte = doc.data();
//         collecte.id = doc.id;
//         collecte.date = collecte.date.toDate().toLocaleDateString();
//         this.collectes.push(collecte);
//         this.collectes$.next(this.collectes);
//       });
//     }
//     else{
//       console.log('empty');
//        this.collectes=[];
//        this.collectes$.next(this.collectes);
//     }
    
//   });
//   this.collectes = [];
//   // console.log(this.collectes);
// }


getAllCollectesbyfiltersforAdmin(partenaire, region,departement,arrondissement,commune,village,typecollecte){
  //partenaire, region, departement, arrondissement, commune, village, partenaire, typecollecte,
  
  let doc;

  if(typecollecte != null && typecollecte != ""){
  if (partenaire.localeCompare('')===0 ){
    doc = this.db.collection('collecte', refcollecte => refcollecte
    .where('typecollecte','==',typecollecte)).get();
  }
  if(partenaire != null && partenaire != "")
  {
    doc = this.db.collection('collecte', refcollecte => refcollecte
    .where('typecollecte','==',typecollecte)
    .where('partenaire', '==', partenaire ),).get();
    // doc = this.db.collection('collecte').doc(partenaire).get();
    if(region != null && region != ""){

      doc = this.db.collection('collecte', refcollecte => refcollecte
      .where('typecollecte','==',typecollecte)
      .where('partenaire', '==', partenaire )
      .where('region','==', region),).get();

      if(departement != null && departement != ""){

        doc = this.db.collection('collecte', refcollecte => refcollecte
        .where('typecollecte','==',typecollecte)
        .where('partenaire', '==',partenaire )
        .where('region','==',region)
        .where('departement','==',departement),).get();

        if(arrondissement != null && arrondissement != ""){
          
          doc = this.db.collection('collecte', refcollecte => refcollecte
          .where('typecollecte','==',typecollecte)
          .where('partenaire', '==',partenaire )
          .where('region','==',region)
          .where('departement','==',departement)
          .where('arrondissement','==',arrondissement),).get();

          if(commune != null && commune != ""){
            doc = this.db.collection('collecte', refcollecte => refcollecte
            .where('typecollecte','==',typecollecte)
            .where('partenaire', '==',partenaire )
            .where('region','==',region)
            .where('departement','==',departement)
            .where('arrondissement','==',arrondissement)
            .where('commune','==',commune),).get();

            if(village != null && village != ""){

              doc = this.db.collection('collecte', refcollecte => refcollecte
              .where('typecollecte','==',typecollecte)
              .where('partenaire', '==',partenaire )
              .where('region','==',region)
              .where('departement','==',departement)
              .where('arrondissement','==',arrondissement)
              .where('commune','==',commune)
              .where('village','==',village),).get();

              if(typecollecte != null && typecollecte != ""){

                doc = this.db.collection('collecte', refcollecte => refcollecte
                .where('typecollecte','==',typecollecte)
                .where('partenaire','==',partenaire)
                .where('region', '==',region )
                .where('department','==',departement)
                .where('arrondissement','==',arrondissement)
                .where('commune','==',commune)
                .where('village','==',village)
                .where('typecollecte','==',typecollecte),).get();

              }
            }
          }
        }
      }
    }
  }

}else {
    if (partenaire.localeCompare('')===0 ){
      doc = this.db.collection('collecte').get();
    }
    if(partenaire != null && partenaire != "")
    {
      doc = this.db.collection('collecte', refcollecte => refcollecte
      .where('partenaire', '==', partenaire ),).get();
      // doc = this.db.collection('collecte').doc(partenaire).get();
      if(region != null && region != ""){
  
        doc = this.db.collection('collecte', refcollecte => refcollecte
        .where('partenaire', '==', partenaire )
        .where('region','==', region),).get();
  
        if(departement != null && departement != ""){
  
          doc = this.db.collection('collecte', refcollecte => refcollecte
          .where('partenaire', '==',partenaire )
          .where('region','==',region)
          .where('departement','==',departement),).get();
  
          if(arrondissement != null && arrondissement != ""){
            
            doc = this.db.collection('collecte', refcollecte => refcollecte
            .where('partenaire', '==',partenaire )
            .where('region','==',region)
            .where('departement','==',departement)
            .where('arrondissement','==',arrondissement),).get();
  
            if(commune != null && commune != ""){
              doc = this.db.collection('collecte', refcollecte => refcollecte
              .where('partenaire', '==',partenaire )
              .where('region','==',region)
              .where('departement','==',departement)
              .where('arrondissement','==',arrondissement)
              .where('commune','==',commune),).get();
  
              if(village != null && village != ""){
  
                doc = this.db.collection('collecte', refcollecte => refcollecte
                .where('partenaire', '==',partenaire )
                .where('region','==',region)
                .where('departement','==',departement)
                .where('arrondissement','==',arrondissement)
                .where('commune','==',commune)
                .where('village','==',village),).get();
  
                if(typecollecte != null && typecollecte != ""){
  
                  doc = this.db.collection('collecte', refcollecte => refcollecte
                  .where('partenaire','==',partenaire)
                  .where('region', '==',region )
                  .where('department','==',departement)
                  .where('arrondissement','==',arrondissement)
                  .where('commune','==',commune)
                  .where('village','==',village)
                  .where('typecollecte','==',typecollecte),).get();
  
                }
              }
            }
          }
        }
      }
    }


}
  //  doc = this.db.collection('collecte', refcollecte => refcollecte
  //                                                                 .where('region', '==',region )
  //                                                                 .where('department','==',departement)
  //                                                                 .where('arrondissement','==',arrondissement)
  //                                                                 .where('commune','==',commune)
  //                                                                 .where('village','==',village)
  //                                                                 .where('partenaire','==',partenaire)
  //                                                                 .where('typecollecte','==',typecollecte),).get();
   

  // var doc = this.db.collection('collecte', ref => ref.where('partenaire', '==', localStorage.getItem('administrateur')));
  doc.subscribe((docData) => {
    if(docData.size>0){
      console.log('!empty');
      docData.forEach(doc => {
        const collecte = doc.data();
        collecte.id = doc.id;
        collecte.date = collecte.date.toDate().toLocaleDateString();
         
      if(collecte.typecollecte === 'pointeau'){
        if(collecte.puitdateexploitation !== ''){
        collecte.puitdateexploitation = collecte.puitdateexploitation.toDate().toLocaleDateString();
        }
        if(collecte.foragedateexploitation !== ''){
          collecte.foragedateexploitation = collecte.foragedateexploitation.toDate().toLocaleDateString();
        }
      }
        this.collectes.push(collecte);
        this.collectes$.next(this.collectes);
      });
    }
    else{
      console.log('empty');
       this.collectes=[];
       this.collectes$.next(this.collectes);
    }
    
  });
  this.collectes = [];
  // console.log(this.collectes);
}



getCollectesCompteurPointDeau(){
  let doc;
  let administrateur = localStorage.getItem('administrateur');
  console.log(administrateur);
  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'pointeau' )
  .where('partenaire', '==', administrateur),).get();
}

getCollectesCompteurBaptimentPublic(){
  let doc;
  let administrateur = localStorage.getItem('administrateur');
  console.log(administrateur);
  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'batimentpublic' )
  .where('partenaire', '==', administrateur),).get()
}

getCollectesCompteurBaptimentPrive(){
  let doc;
  let administrateur= localStorage.getItem('administrateur');
  console.log(administrateur);
  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'batimentprive' )
  .where('partenaire', '==', administrateur),).get()
}

getCollectesCompteurLatrine(){
  let doc;
  let administrateur = localStorage.getItem('administrateur');
  console.log(administrateur);
  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'latrine' )
  .where('partenaire', '==', administrateur),).get()
}

getCollectesCompteurDanger(){
  let doc;
  let administrateur = localStorage.getItem('administrateur');
  console.log(administrateur);
  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'danger' )
  .where('partenaire', '==', administrateur),).get()
}


getCollectesCompteurPointDeauAdmin(){
  let doc;
  
  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'pointeau' ),).get();
}

getCollectesCompteurBaptimentPublicAdmin(){
  let doc;
  
  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'batimentpublic' ),).get()
}

getCollectesCompteurBaptimentPriveAdmin(){
  
  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'batimentprive' ),).get()
}

getCollectesCompteurLatrineAdmin(){
  let doc;
  
  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'latrine' ),).get()
}

getCollectesCompteurDangerAdmin(){
  let doc;

  return this.db.collection('collecte', refcollecte => refcollecte
  .where('typecollecte', '==', 'danger' ),).get()
}

}