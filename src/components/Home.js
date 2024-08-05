import React, { useContext, useState, useEffect } from 'react'
import Addcart from './Addcart'
import Cartcontext from '../context/Cartcontext';
import ButtonCart from './ButtonCart';
import ProductCard from './Productcard';
import Productquantity from './Productquantity';
import Loading from './Loading';
import Footer from './Footer';

export default function Home(props) {
    const context = useContext(Cartcontext);
    const { addcart, carts } = context;
    const [cart, setcart] = useState({ product: "", quantity: "", price: "" });

    const handleclick = (product, quantity, price, imageUrl, e) => {
        e.preventDefault();
        addcart(product, quantity, price, imageUrl);
        <ButtonCart />
        props.showalert("Added Succesfully", "success");
    }
    const [state, setState] = useState(false)
    const spinnerloading = () => {
        setTimeout(() => {
            setState(true)
        }, 1500);
        setState(false)
    }
    useEffect(() => {
        spinnerloading();
        // Clean up the timer on component unmount
    }, []);
    return (
        <>

            <h1 className='text-center'>Welcomes To The Grocery Store</h1>
            {!state ? 

                <div className="container text-center"><Loading /> </div> :
                <div>
                <div className='container d-flex flex-wrap'>
                    <ProductCard
                        product="Apple"
                        quantity={1}
                        price={100}
                        imageUrl="https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg"
                        handleclick={handleclick}
                    />
                    <ProductCard
                        product="Orange"
                        quantity={1}
                        price={200}
                        imageUrl="https://thumbs.dreamstime.com/b/sliced-orange-fruit-leaves-isolated-white-23331258.jpg"
                        handleclick={handleclick}
                    />
                    <ProductCard
                        product="Pineapple"
                        quantity={1}
                        price={200}
                        imageUrl="https://media.self.com/photos/5b4371cc4d0c3c282a8878d3/4:3/w_2560%2Cc_limit/pineapple.jpg"
                        handleclick={handleclick}
                    />
                    <ProductCard
                        product="Cauliflower"
                        quantity={1}
                        price={200}
                        imageUrl="https://img.taste.com.au/DBCUD8iO/taste/2007/05/cauliflower-181864-2.jpg"
                        handleclick={handleclick}
                    />
                    <ProductCard
                        product="Tomato"
                        quantity={1}
                        price={200}
                        imageUrl="https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?cs=srgb&dl=pexels-pixabay-533280.jpg&fm=jpg"
                        handleclick={handleclick}
                    />
                    <ProductCard
                        product="Potato"
                        quantity={1}
                        price={200}
                        imageUrl="https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg"
                        handleclick={handleclick}
                    />
                </div>
                <Footer />
            </div> }
        </>

    )
}
