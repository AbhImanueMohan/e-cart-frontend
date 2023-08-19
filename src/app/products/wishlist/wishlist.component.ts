import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  
  wishlistAdd:any=[]
  wish:string=''
  constructor(private api:ApiService){}
 
  ngOnInit(): void {
      this.api.getwishlist().subscribe((result:any)=>{
        console.log(result);
        this.wishlistAdd=result
        
      })
  }
  //delete wishlist product
  wishlistDelete(id:any){
    this.api.deleteWishlist(id).subscribe((result:any)=>{
      console.log(result);
      this.wishlistAdd = result//array of wishlist products

      
    })
  }
 

}
