import React, { useEffect, useState } from 'react';
import Loading from './Loading'

export default function ProductCard({ product, quantity, price, imageUrl, handleclick }) {
  const [state, setState] = useState(false)
  const spinnerloading = () => {
    setTimeout(() => {
      setState(true)
    }, 500);
  }

  useEffect(() => {
    setTimeout(() => {
      setState(true);
    }, 500);

    // Clean up the timer on component unmount
  }, []);

  return (
    <>
      
         <div className="card mx-2 my-2" style={{ width: "18rem" }}>
          <span className="position-absolute translate-middle badge rounded-pill text-bg-success" style={{ zIndex: "100", right: "-10%" }}>
            Fresh
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={imageUrl} style={{ width: "100%", height: "220px" }} className="card-img-top" alt={product} />
          <div className="card-body">
            <h5 className="card-title my-2">{product}</h5>
            <div className='card-text my-2'>Quantity: {quantity}</div>
            <div className='card-text my-2'>Price: {price} (per)</div>
            <a href="/" className="btn btn-primary" onClick={(e) => handleclick(product, quantity, price, imageUrl, e)}>Add to Cart</a>
          </div>
        </div>
    </>
  );
}
