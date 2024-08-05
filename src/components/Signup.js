import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import UserAccount from './UserAccount';

export default function Signup({ showalert }) {
    const host = "http://localhost:5000";
    const [info, setinfo] = useState({
        name: "", email: "", password: ""
    })
    // let navigate = useNavigate();
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = info;
        const response = await fetch(`${host}/api/auth/createanewuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: info.name, email: info.email, password: info.password
            })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            history.push("/");
            showalert("Account is created successfully", "success");
        }
        else {
            showalert("Invalid information", "danger");
        }
    }

    const onChange = (e) => {
        setinfo({ ...info, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Signup to Continue to the Grocery store</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name='email' />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
