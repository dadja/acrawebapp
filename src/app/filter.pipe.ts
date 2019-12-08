import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    // transform(value: any, args?: any): any {
    //   return null;
    // }

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( (it) => {
      return it.deviceNumber.toString().includes(searchText);
    });
   }

}
