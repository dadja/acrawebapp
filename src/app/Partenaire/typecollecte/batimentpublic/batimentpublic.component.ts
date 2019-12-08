import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollectesService} from 'src/app/services/collectes.service';

@Component({
  selector: 'app-batimentpublic',
  templateUrl: './batimentpublic.component.html',
  styleUrls: ['./batimentpublic.component.css']
})
export class BatimentpublicComponent implements OnInit {
  @Input() childMarker;
  @Output() onPageChild = new EventEmitter<string>();
  color;
  constructor(private collecteService: CollectesService) { }

  ngOnInit() {
    this.color = localStorage.getItem('color');

  }

  delete(id){
    this.collecteService.deleteCollecte(id);
    this.setTypeCollecte();
  }

  setTypeCollecte(){
    this.onPageChild.emit('');
 }

}
