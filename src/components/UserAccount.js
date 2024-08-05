import React, { useState, useEffect } from 'react'

export default function UserAccount() {
    const host = "http://localhost:5000";
    const [userdetails, setuserdetails] = useState({
        ename: "", email: "", date: "", userimage: ""
    })

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    const getuser = async () => {
        const response = await fetch(`${host}/api/auth/getauser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const data = await response.json();
        console.log(data);
        setuserdetails({ ename: data.name, email: data.email, date: formatDate(data.date), userimage: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yX3Bob3RvX29mX2FfbGlvbl9pc29sYXRlZF9vbl9jb2xvcl9iYWNrZ3JvdW5kXzJhNzgwMjM1LWRlYTgtNDMyOS04OWVjLTY3ZWMwNjcxZDhiMV8xLmpwZw.jpg" });
    }

    useEffect(() => {
        getuser();
    }, []);


    return (
        <>
        <h1 className='text-center'>Your Account Details</h1>
        <div className='container d-flex justify-content-center'>
            <div className="card" style={{width: "18rem",height: "100%"}}>
                <img src={userdetails.userimage} className="card-img-top" alt="" style={{width: "100%",height: "220px"}}/>
                <div className="card-body">
                    <div className="card-title">Name: {userdetails.ename}</div>
                    <div className="card-title">Email: {userdetails.email}</div>
                    <div className="card-title">Date of Login: {userdetails.date}</div>
                </div>
            </div>
        </div>
        </>
    )
}
