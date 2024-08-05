import React, { useState } from 'react'
import Cartcontext from './Cartcontext';


export default function Cartstate(props) {
    const host = "http://localhost:5000";
    const [carts, setcarts] = useState([]);

    //Function to fetch all carts of a particular user having a id

    const getcart = async () => {
        const response = await fetch(`${host}/api/addtocart/fetchallcart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const data = await response.json();
        setcarts(data[0]);
    }

    //function to add a cart
    const addcart = async (product, quantity, price,imageUrl) => {
        const response = await fetch(`${host}/api/addtocart/addcart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ product, quantity, price,imageUrl})
        });
        const cart = await response.json();
        setcarts(carts.concat(cart));
    }

    //function to delete a cart
    const deletecart = async (id) => {
        const response = await fetch(`${host}/api/addtocart/deletecart/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const json = await response.json();
        const newcarts = carts.filter((cart) => { return cart._id !== id });
        if (newcarts.length === 0) {
            setcarts(newcarts);
        }
        setcarts(newcarts);

    }

    //Function to edit the quantity
    const editquantity = async (id, quantity) => {
        const response = await fetch(`${host}/api/addtocart/editquantity/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({quantity})
        });
        const json=await response.json();
        let newcart=JSON.parse(JSON.stringify(carts));
        for (let index=0;index<newcart.length;index++){
            const element=newcart[index];
            if(element._id===id){
                newcart[index].quantity=quantity;
                break;
            }
        }
        setcarts(newcart);
    }


    return (
        <Cartcontext.Provider value={{ carts, setcarts, addcart, getcart, deletecart ,editquantity }}>
            {props.children}
        </Cartcontext.Provider>
    )
}
