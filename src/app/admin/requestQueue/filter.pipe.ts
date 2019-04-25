import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
  // pure:false
})
export class FilterPipe implements PipeTransform {
  /* transform(value: any, searchText:string): any {
    if(value.length===0 || searchText==="")
    {
      return value;
    }
    const resultArray=[];
    for(const item of value)
    {
      if(item===searchText)
      {
        resultArray.push[item];
      }
    }
    return resultArray;
  }*/
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function(value) {
      return JSON.stringify(value)
        .toLowerCase()
        .includes(args);
    });
  }
}
