import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CollectesService} from 'src/app/services/collectes.service';

@Component({
  selector: 'app-danger',
  templateUrl: './danger.component.html',
  styleUrls: ['./danger.component.css']
})
export class DangerComponent implements OnInit {
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
