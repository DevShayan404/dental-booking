import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'drList'
})
export class DrListPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    return value.filter(function (search: any) {
      return (
        search.BusinessName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        // ||
        // search.LastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        // search.InitialName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
}