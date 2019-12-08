import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-ajout-device',
  templateUrl: './ajout-device.component.html',
  styleUrls: ['./ajout-device.component.css']
})
export class AjoutDeviceComponent implements OnInit {
  @Output() onPageChild = new EventEmitter<string>();
  color;
  collecteurForm = new FormGroup({
    Libele: new FormControl(''),
  });
  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.color = localStorage.getItem('color');
  }

  addDevice(){

    console.log(this.collecteurForm.value);
    const data = this.collecteurForm.value;
    data['partenaireId'] = localStorage.getItem('administrateur');
    data['collecteurId'] = "";
    data['isFree'] = "true"; 
    console.log(data);
    if (data.Libele.localeCompare("") === 0 ) {
      alert('Veuillez remplir les champs');
    } else {
      //console.log(data);
    this.deviceService.addDevice(data);
    //this.childPage = 'accueil';
    this.setPage();

  }
}

  setPage(){
    this.onPageChild.emit('accueil');
  }

}
