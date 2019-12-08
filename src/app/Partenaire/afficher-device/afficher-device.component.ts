import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/services/device.service';
import { FilterPipe }from 'src/app/filter.pipe';
import { FormControl } from '@angular/forms';
import { CollecteurService } from 'src/app/services/collecteur.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-afficher-device',
  templateUrl: './afficher-device.component.html',
  styleUrls: ['./afficher-device.component.css']
})
export class AfficherDeviceComponent implements OnInit  {
  color = localStorage.getItem('color');
  appareils;
  devices =[];
  deviceSubscription: Subscription; 
  collecteurSubscription: Subscription;
  searchText;

  currentDevice;

  newDeviceLibele = new FormControl('');

  closeResult: string;
  constructor(private modalService: NgbModal, private deviceService: DeviceService, private collectorService: CollecteurService) { }

  ngOnInit() {
    // this.collectorService.getAllcollecteur();
    // this.collecteurSubscription = this.collectorService.collecteurs$.subscribe(
    //   (docs)=>{
    //     console.log(docs);
    //   }
    //);

    this.deviceService.getAllDevices();
    this.deviceSubscription = this.deviceService.devices$.subscribe(
      (doc)=>{
        console.log(doc);
        // this.appareils = doc;
        // this.appareils.forEach((element) => {
        //   this.devices.push(element);
        //   console.log(this.devices);
        // });
        this.devices = doc;
        this.appareils = [];
        console.log(this.appareils);
  });

}

open(content, device) {
  console.log(device);
  this.currentDevice = device;
  console.log(this.currentDevice);
  this.newDeviceLibele.setValue(this.currentDevice.Libele);
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', injector: device}).result.then((result) => {
    this.closeResult = `${result}`;
    if (this.closeResult === "enregistrer"){
      console.log(this.newDeviceLibele.value);
      this.deviceService.updateDevice(this.currentDevice, this.newDeviceLibele.value);
    }
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

ngOnDestroy(){
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.deviceSubscription.unsubscribe();
    this.appareils = [];
    this.devices = [];
  }
}
