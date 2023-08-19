import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  cartCount:string=''
  
  constructor(private api:ApiService){}
  ngOnInit(): void {
          //cart count calling
    this.api.cartItemCount.subscribe((data:any)=>{
      console.log(data);
      this.cartCount  = data
      
     })
  }
  search(event:any){
    console.log(event.target.value);//
    //assigning new value to behaviour subject use next() method
    this.api.searchKey.next(event.target.value)
    

  }

}
