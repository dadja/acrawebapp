import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  devices = [];
  devices$ = new Subject<any[]>();
  deviceRang;
  constructor(private db: AngularFirestore) { }

  getAllDevices(){
    this.db.collection('device', ref => ref.where('partenaireId', '==', localStorage.getItem('administrateur')))
    .get()
    .subscribe((snapshot) =>{
      snapshot.forEach(doc => {
       console.log(doc);
       const data = doc.data();
       data.id = doc.id;
       this.devices.push(data);
       this.devices$.next(this.devices);
       this.devices = [];
      });
    });
}

getOneDevice(data){
  return this.db.collection('device').doc(data).get();
}

addDevice(data) {
  console.log(data);
  //var doc = this.db.collection('collecteur',  ref => ref.where('email', '==', data.email));
  var doc = this.db.collection('device');
  doc.get().subscribe((docData) => {
    console.log(docData);
    docData.forEach(doc => {
      console.log(doc);
    
       const collecteur = doc.data();
       collecteur.id = doc.id;
       this.devices.push(collecteur);
       console.log(this.devices);
       
      });
      console.log(this.devices);
      // var alreadyAdded; //variable pour verifier si le collecteur qu on essaie de creer existe deja.
      // for (var i = 0; i<=this.devices.length - 1; i++){
      //   const IMEI = this.devices[i].IMEI;
      //   if (IMEI.localeCompare(data.IMEI)===0){
      //     console.log('il existe deja un appareil avec cet mei.');
      //     alreadyAdded = 'true';
      //     break;
      //   } else {
      //     alreadyAdded = 'false';
      //   }
      // }
      // if (alreadyAdded.localeCompare('false')===0) {
        var rangDevice;
        this.db.collection('device',ref => ref.orderBy('deviceNumber', 'desc').limit(1)).get().subscribe(
            (docData)=>{
              docData.forEach(doc =>{
                const device = doc.data();
                rangDevice = device.deviceNumber + 1;
                console.log(rangDevice);
                 console.log(device);
                 console.log(data);
                  this.db.collection('device')
                  .add({ Libele: data.Libele,
                         collecteurId:data.collecteurId, 
                         partenaireId: data.partenaireId, 
                         isFree: data.isFree, 
                         deviceNumber: rangDevice});
                  alert('Appareil ajoute');
              })
            }
        )
       
      // } else {
      //   alert('Une erreur s\'est produite, veuillez recommencer l ajout de l\'appareil');
      // }
      this.devices = [];
    })
    
  }

  updateDevice(device, deviceLibele){
    var doc = this.db.collection('device').doc(device.id);
    doc.get().subscribe((docData) => {
      console.log(docData.data());
      const data = docData.data();
      if(docData.exists){
        this.db.collection('device').doc(device.id).set({ Libele: deviceLibele}, {merge: true});
        console.log('on call get devices');
        this.getAllDevices();
       }
    } );
  }

  updateAssocierDevice(id, deviceId) {
    console.log('update device');
    //var doc = this.db.collection('collecteur',  ref => ref.where('email', '==', data.email));
    var doc = this.db.collection('device').doc(deviceId);
    doc.get().subscribe((docData) => {
      console.log(docData.data());
      const data = docData.data();
      if(docData.exists){
        this.db.collection('device').doc(deviceId).update({ Libele: data.Libele, isFree: 'false', collecteurId:id, partenaireId: data.partenaireId });
        console.log('on call get devices');
        this.getAllDevices();
       }
    } ); 
  
  }

  updateDissocierDevice(collecteurId) {
    console.log('update dessocier device');
    //var doc = this.db.collection('collecteur',  ref => ref.where('email', '==', data.email));
    var doc = this.db.collection('device', ref => ref.where('collecteurId', '==', collecteurId));
    doc.get().subscribe((docData) => {
      console.log(docData);
      docData.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      this.db.collection('device').doc(data.id).update({ IMEI: data.IMEI, Libele: data.Libele, isFree: 'true', collecteurId: '', partenaireId: data.partenaireId });
      console.log('on call get devices');
      this.getAllDevices();
    });
      // if(docData.exists){
      //   this.db.collection('device').doc(deviceId).update({ IMEI: data.IMEI, Libele: data.Libele, isFree: 'false', collecteurId:id, partenaireId: data.partenaireId });
      //   this.getAllDevices();
      //  }
    } ); 
  
  }
}




