import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CollectesService} from 'src/app/services/collectes.service';
@Component({
  selector: 'app-batimentprive',
  templateUrl: './batimentprive.component.html',
  styleUrls: ['./batimentprive.component.css']
})
export class BatimentpriveComponent implements OnInit {
  @Input() childMarker;
  @Output() onPageChild = new EventEmitter<string>();
  color;
  datum;
  date;
  constructor(private collecteService: CollectesService) { }

  ngOnInit() {
    this.color = localStorage.getItem('color');
    console.log('date from server ',this.childMarker.date.toDate())
    console.log(this.childMarker.date);
    
  }

  delete(id){
    this.collecteService.deleteCollecte(id);
    this.setTypeCollecte();
  }

  setTypeCollecte(){
    this.onPageChild.emit('');
 }
  
}
