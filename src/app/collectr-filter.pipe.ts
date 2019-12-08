import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collectrFilter'
})
export class CollectrFilterPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( (it) => {
      return it.nom.toLowerCase().includes(searchText) || it.prenom.toLowerCase().includes(searchText);
    });
   }


}
