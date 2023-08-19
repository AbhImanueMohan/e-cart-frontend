import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  showPaypalStatus:boolean=false;

  // paypal
  public payPalConfig?: IPayPalConfig;

  showSuccess:boolean=false

  //discount
  discountClick:boolean=false

  // offers
  offerClicked: boolean=false;

  //values that is added in html
  username:string=''
  houseno:string=''
  street:string=''
  state:string=''
  phoneno:string=''

  //displaying the details from the form
  paymentStatus: boolean=false;

  cartAdd:any=[]

  totalprice= 0;//hold total price

  constructor( private api:ApiService ,private payFB:FormBuilder){}
  ngOnInit(): void {


    

    this.api.getcart().subscribe((result:any)=>{
      console.log(result);
      this.api.cartCount()
      this.cartAdd=result
      this.getcartTotal()

      this.initConfig();
     
      
    })
  }

  paymentForm = this.payFB.group({
    username:['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    houseno:['', [Validators.required, Validators.pattern('[0-9]*')]],
    streetname :['', [Validators.required, Validators.pattern('[a-zA-Z 0-9]*')]],
    state:['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    phoneno:['', [Validators.required, Validators.pattern('[0-9]*')]]


  })
  //delete wishlist product
  cartDelete(id:any){
    this.api.deleteCart(id).subscribe((result:any)=>{
      console.log(result);
      this.cartAdd = result

      
    })


  }

  //get cart total

  getcartTotal(){
    let total = 0
    this.cartAdd.forEach((result:any)=>{
      total+=result.grandTotal
      this.totalprice=Math.ceil(total)

    })
  }

  //increment
  incrementCarts(id:any){
    this.api.incrementCart(id).subscribe((result:any)=>{
      this.cartAdd=result;
      this.getcartTotal()
    },
    (result:any)=>{
      alert(result.error)
    })
  }

  //decrement 
  decrementCarts(id:any){
    this.api.decrementCart(id).subscribe((result:any)=>{
      this.cartAdd=result;
      this.getcartTotal()
    },
    (result:any)=>{
      alert(result.error)
    })


    // validator for checkout

 
  }


  // proceed to pay button
  submitPay(){
    if(this.paymentForm.valid){
      this.username=this.paymentForm.value.username || '';
      this.houseno=this.paymentForm.value.houseno || '';
      this.street=this.paymentForm.value.streetname || '';
      this.state=this.paymentForm.value.state || '';
      this.phoneno=this.paymentForm.value.phoneno || '';

      this.paymentStatus=true

    }
    else{
      alert("Invalid Form")
    }
  }

  // offers
  offerClick(){
    this.offerClicked=true
    this.discountClick=true
  }

  discount(value:any){
    this.totalprice= this.totalprice*(100-value)/100
    this.offerClicked =false
  }

  // paypal

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  // paypal calling
  paypalPay(){
    this.showPaypalStatus=true;
  }
  reset(){
    this.paymentForm.reset()
    this.showPaypalStatus=false
    this.showSuccess=false
    this.paymentStatus=false
  }

}
