import React from 'react'
import { Form, redirect } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';


const fakeCart=[
    {
        pizzaId:12,
        name:'Poori',
        quantity:2,
        unitPrice:16,
        totalPrice:32,

    },
    {
        pizzaId:6,
        name:'Garlic Bread',
        quantity:1,
        unitPrice:13,
        totalPrice:13
    },
    {
        pizzaId:11,
        name:'Magerata and Spinach',
        quantity:1,
        unitPrice:15,
        totalPrice:15
    }
]

export default function CreateOrder() {

    const cart=fakeCart;


  return (
    <div>
      <h2>Ready To order Lets Go</h2>


<Form method='POST'>
    <div>
        <label>First Name</label>
        <input type="text" name="customer" required/>

    </div>

    <div>
        <label>Phone Number</label>
        <input type="tel" name="phone" required/>

    </div> 
    <div>
        <label>Address</label>
        <div>
            <input type="text" name="address" required />

        </div>
    </div>

    <div>
        <input type="checkbox" name="priority" id="priority" />
        <label htmlFor='priority'>Want to give Your Order Priority</label>
    </div>

    <div>
        <input  type="hidden" name="cart" value={JSON.stringify(cart)}/>
        <button>Order Now</button>
    </div>
</Form>



    </div>
  )
}

export async function action({request}){
    const formData=await request.formData();
    const data=Object.fromEntries(formData)


    const order={
        ...data,
        cart:JSON.parse(data.cart),
        priorit:data.priority==='on',


    }
  

    const newOrder=await createOrder(order);
    console.log(newOrder)



    return redirect(`/order/${newOrder.id}`);


}
