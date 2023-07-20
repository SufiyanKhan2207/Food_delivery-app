import React, {useState} from 'react';
import {Link} from "react-router-dom";

const SignUp = () => {
        const [details , setDetails] = useState({
            name:"",
            email:"",
            password:"",
            geolocation:""
        })
    const handleChange=(e)=>{
            setDetails({...details,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name:details.name,
                email:details.email,
                password:details.password,
                location:details.geolocation
            })

        })
        const json = await response.json();
        console.log(json);

        if (!json.success){
            alert("Enter valid Details!")
        }


    }
    return (
        <>
             <div className='container my-5 font-monospace'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"  name='name' onChange={handleChange} value={details.name} className="form-control"
                     placeholder="Enter Name"/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name='email' onChange={handleChange} value={details.email}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                        else.</small>
                </div>



                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" onChange={handleChange} name='password' value={details.password} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input type="text" onChange={handleChange} name='geolocation' value={details.geolocation} className="form-control" id="exampleInputPassword1" placeholder="Address"/>
                </div>

                <button type="submit" className="m-3 btn btn-primary">Submit</button>
                <Link to='/login' className='m-3 btn btn-danger '>Already a user</Link>
            </form>
                 </div>
        </>
    );
};

export default SignUp;