import React, { useContext, useEffect, useState, useRef } from 'react'
import Cartcontext from '../context/Cartcontext';
import Cartitem from './Cartitem';
import { useHistory } from 'react-router-dom';

export default function Carts(props) {
    const context = useContext(Cartcontext);
    const { carts, setcarts, addcart, getcart,editquantity } = context;
    const [cart, setcart] = useState({
        id: "", quantity: ""
    });
    const ref=useRef(null);
    const refClose=useRef(null);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getcart();
        }
        else {
            history.push("/login");
        }
    }, [])
    
    const editcart=(currentcart)=>{
        ref.current.click();
        setcart({id: currentcart._id,quantity: currentcart.quantity});
    }

    const handleclick=(e)=>{
        editquantity(cart.id,cart.quantity);
        ref.current.click();
        props.showalert("updated successfully","success");
    }

    const onChange=(e)=>{
        setcart({...cart,[e.target.name]: e.target.value})
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Quantity</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Change Quantity</label>
                                    <input type="text" className="form-control" id="quantity" value={cart.quantity} name='quantity' aria-describedby="emailHelp" onChange={onChange} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Edit Quantity</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <h2>Your Cart</h2>
                <div className="container mx-1">
                    {carts.length === 0 && <p>Cart is Empty</p>}
                </div>
                {carts.map((cart) => {
                    return <Cartitem key={cart._id} editcart={editcart} showalert={props.showalert} cart={cart} />
                })}
            </div>
        </>
    )
}

