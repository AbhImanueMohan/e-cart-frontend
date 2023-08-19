import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform( productName:any[],searchkey:string,propName:string) :any[]{
    const result:any[]=[]
    if(!productName ||searchkey==''||propName==''){
      return productName
    }
    productName.forEach((product:any)=>{
  if(product[propName].trim().toLowerCase().includes(searchkey.trim().toLowerCase())){
  result.push(product)
  }
    })
  
    return result;
  }

}
