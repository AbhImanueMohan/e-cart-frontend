import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class  ViewProductComponent implements OnInit  {

  productId: any
  product:any=[]
  constructor(private api:ApiService, private viewActivatedRoute:ActivatedRoute ){}
  ngOnInit(): void {
    this.viewActivatedRoute.params.subscribe((data:any)=>{
      this.productId = data.id
      this.api.viewProduct(this.productId).subscribe((result:any)=>{
        this.product=result;
      })
    })
      
  }
  
addToWishlist(){
  const {id,title,price,image}=this.product   //destructuring
  this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result)
  },
  (result:any)=>{
    alert(result.error);
      })
    }
// add to cart
addToCart(product:any){

  // add quantity 1 to product object
  Object.assign(product,{quantity:1})
  console.log(product);
  this.api.addtocart(product).subscribe((result:any)=>{
    this.api.cartCount()

    alert(result)
  },
  (result:any)=>{
    alert(result.error)
  }
  )
  
}

}
