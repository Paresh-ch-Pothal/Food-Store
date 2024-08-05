import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Login(props) {
    const host = "http://localhost:5000";
    const [info, setinfo] = useState({
        email: "", password: ""
    });
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/userlogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: info.email, password: info.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            props.showalert("Account is present ","success");
            history.push("/");
        }
        else {
            props.showalert("Invalid Information ","danger");
        }
    }
    const onChange = (e) => {
        setinfo({ ...info, [e.target.name]: e.target.value })
    }
    return (
        <><div className="container">
            <h2 className='text-center'>Login to continue to the Grocery-Store</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" value={info.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={onChange} className="form-control" id="password" name='password' value={info.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}
