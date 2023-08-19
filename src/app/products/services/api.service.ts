import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //to hold search value
 searchKey = new BehaviorSubject('')

 //to hold cart count
 cartItemCount=new BehaviorSubject(0)
constructor(private http:HttpClient) { }
BASE_URL = 'http://localhost:5000'

 
//get all product
getAllProducts(){
  return this.http.get(`${this.BASE_URL}/products/allProducts`)

}

viewProduct(id:any){
  return this.http.get(`${this.BASE_URL}/products/viewProduct/${id}`)
}
  //wishlist api call
  addtowishlist(id:any,title:any,price:any,image:any){
    const body={
      id,
      title,
      price,
      image
    }
    return this.http.post(`${this.BASE_URL}/products/addtowishlist`,body)
  }
  //getallproducts from wishlist

  getwishlist(){
    return this.http.get(`${this.BASE_URL}/products/wishlist`)
  }

  deleteWishlist(id:any){
    return this.http.delete(`${this.BASE_URL}/products/deletewishlist/${id}`)




}
addtocart(product:any){
  const body={
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
    quantity:product.quantity
 
  }
  return this.http.post(`${this.BASE_URL}/products/addtocart`,body)
  }


//getallproducts from cart

getcart(){
return this.http.get(`${this.BASE_URL}/products/cart`)
}

//delete

deleteCart(id:any){
return this.http.delete(`${this.BASE_URL}/products/deletecart/${id}`)
}

//cart count
cartCount(){
this.getcart().subscribe((result:any)=>{
  this.cartItemCount.next(result.length);//3

  

})
}

//increment call
incrementCart(id:any){
return this.http.get(`${this.BASE_URL}/products/increment/${id}`)
}

//decrement call
decrementCart(id:any){
return this.http.get(`${this.BASE_URL}/products/decrement/${id}`)
}

}

