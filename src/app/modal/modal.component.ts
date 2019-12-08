import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


// export class NgbdModalContent {
//   @Input() name;

//   constructor() {}
// } 

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  // openModal(message){
  //   const modalRef = this.modalService.open(ModalComponent);
  //   modalRef.componentInstance.message = message;
  // }

}
