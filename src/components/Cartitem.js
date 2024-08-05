// import React, { useContext } from 'react'
// import Cartcontext from '../context/Cartcontext'

// export default function Cartitem(props) {
//     const arr = ["https://t3.ftcdn.net/jpg/05/79/59/28/360_F_579592812_uWrjtNeV4gfGBrJqmUD6Z8yVsjohBVBM.jpg", "https://c4.wallpaperflare.com/wallpaper/147/545/208/nature-basket-apples-grapes-wallpaper-preview.jpg", "https://i0.wp.com/www.ayurtimes.com/wp-content/uploads/2020/10/Cherries.jpg", "https://www.ambalacakes.com/blog/wp-content/uploads/2023/06/bakery-items.jpg"] //this can is going to used in another function

//     const context=useContext(Cartcontext);
//     const {deletecart}=context;

//     const {cart}=props;
//     const { product, quantity, price } = cart.items[0];
//     return (
//         <>
//             <div className="card" style={{ width: "18rem" }}>
//                 <img src="" className="card-img-top" alt="..." />
//                 <div className="card-body">
//                     <h5 className="card-title">{product}</h5>
//                     <div className="card-text">{quantity}</div>
//                     <div className="card-text">{price}</div>
//                     <i className="fa-solid fa-trash" onClick={()=>{
//                         deletecart(cart._id); props.showalert("Deleted successfully","success");
//                     }}></i>
//                 </div>
//             </div>
//         </>
//     )
// }

import React, { useContext } from 'react';
import Cartcontext from '../context/Cartcontext';

export default function Cartitem(props) {

    const context = useContext(Cartcontext);
    const { deletecart } = context;

    const { cart, editcart } = props; // Get the first item in the cart.items array

    // Check if item exists before attempting to destructure its properties

    // Destructure the properties of the item

    return (
        <>
                <div className="card mx-3 my-3" style={{ width: "18rem" }}>
                    <img src={cart.imageUrl} style={{ width: "100%", height: "220px" }} className="card-img-top" alt="Product" /> {/* Set the src attribute with an actual image URL */}
                    <div className="card-body">
                        <h5 className="card-title">{cart.product}</h5>
                        <div className="card-text">Quantity: {cart.quantity}</div>
                        <div className="card-text">Price: {cart.price * cart.quantity} </div>
                        <i className="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => {
                            deletecart(cart._id);
                            props.showalert("Deleted successfully", "success");
                        }}></i>
                        <i className="fa-regular fa-pen-to-square mx-3" style={{ cursor: "pointer" }} onClick={() => { editcart(cart) }}></i>
                    </div>
                </div>
        </>
    );
}

