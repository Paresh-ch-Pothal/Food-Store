import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Navbar() {
    let history = useHistory();
    const handleclicklogout = () => {
        localStorage.removeItem("token");
        history.push("/login");
    }
    const handleclick=()=>{
        history.push("/buttoncart");
    }
    const handleaccount=()=>{
        history.push("/useraccount");
    }
    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src="https://img.freepik.com/premium-vector/food-shop-logo-template-design-vector-emblem-design-concept-creative-symbol-icon_316488-2511.jpg" alt="" width="30" height="24" />
                    </a>
                    <Link className="navbar-brand" to="/">Grocery</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/fruits">Fruits</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/vegetables">Vegetables</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token") ? <form className="d-flex" role="search">
                            <Link className="btn btn-outline-success mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-outline-success mx-2" to="/signup" role="button">SignUp</Link>
                        </form> : <form> <Link className="btn btn-outline-success mx-2" to="/login" onClick={handleclicklogout} role="button">Logout</Link>
                        <i className="fa-solid fa-house-user mx-2" onClick={handleaccount} style={{ filter: "invert()", cursor: "pointer" }}></i> </form>}

                        <i className="fa-solid fa-cart-shopping mx-2" onClick={handleclick} style={{ filter: "invert()", cursor: "pointer" }}></i>
                    </div>
                </div>
            </nav>
        </>
    )
}
