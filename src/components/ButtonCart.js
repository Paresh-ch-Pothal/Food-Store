import React, { useContext, useEffect, useState } from 'react'
import Carts from './Carts'
import Cartcontext from '../context/Cartcontext'

export default function ButtonCart(props) {
  const context = useContext(Cartcontext);
  const { carts } = context;
  const [pprice, setprice] = useState(0);

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < carts.length; i++) {
      price = price + carts[i].price * carts[i].quantity;
    }
    setprice(price);
  }, [carts])
  return (
    <>
      <div className="container my-3">
        <div className='container'>
          <Carts showalert={props.showalert} />
        </div>
        <div className="container">
          <h2>Total Price: {pprice}</h2>
        </div>
      </div>
    </>
  )
}
