import React, {useState} from 'react'
import {Link , useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [details , setDetails] = useState({
    email:"",
    password:"",
  })

  let navigate = useNavigate();
  const handleChange=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    })
    const json = await response.json();
    console.log(json);

    if (!json.success){
      alert("Enter valid Details!")
    }
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.authToken)
      navigate("/");

    }


  }
  return (
      <>
      <Navbar/>
      <div className='container my-5 font-monospace'>
        <form onSubmit={handleSubmit}>
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


          <button type="submit" className="m-3 btn btn-primary">Log In</button>
          <Link to='/createuser' className='m-3 btn btn-danger '>Create user</Link>
        </form>
      </div>
        </>
  )
}

export default Login