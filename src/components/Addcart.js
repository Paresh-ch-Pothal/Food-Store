import React, { useContext, useState } from 'react'
import Cartcontext from '../context/Cartcontext'
import Carts from './Carts';

export default function Addcart() {
  const context = useContext(Cartcontext);
  const { addcart } = context;
  const [cart, setcart] = useState({ product: "", quantity: "", price: "" });

  const handleclick=()=>{
    addcart(cart.product, cart.quantity, cart.price);
  }

  const onChange=(e)=>{
    setcart({ ...cart, [e.target.name]: e.target.value })
  }


  return (
    <div>
      
    </div>
  )
}
