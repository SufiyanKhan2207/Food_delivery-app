import React, {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import {Badge} from "react-bootstrap";
import Modal from "../Modal";
import Cart from "../page/Cart";
import {useCart} from "./ContextReducer";

function Navbar() {
    let data = useCart()
    const navigate = useNavigate();
    const [cartView , setCartView] = useState()
    const handle = ()=>{
   localStorage.removeItem('authToken');
   navigate('/login')
    }


    return (
    <>
     <nav className="navbar navbar-expand-lg navbar-light bg-dark">
     <Link className="navbar-brand font-weight-bold font-italic text-light bg-dark" to="/">GoFood</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
        <Link className="nav-link active font-monospace" to="#">Home <span className="sr-only">(current)</span></Link>
      </li>
        {(localStorage.getItem("authToken")) ?
            <li className="nav-item ">
                <Link className="nav-link active font-monospace" to="/myorder">My Orders <span className="sr-only">(current)</span></Link>
            </li> : ""

        }
    </ul>
      {(!localStorage.getItem("authToken")) ?
      <div className='d-flex'>
          <Link className='btn bg-white text-success font-monospace mx-1' to='/login'>Login</Link>
          <Link className='btn bg-white text-danger  font-monospacemx-1' to='/signup'>Sign Up</Link>

      </div>
          :
          <>
          <div onClick={()=>setCartView(true)} className='btn bg-white text-success mx-2'>
                   MyCart{' '}
              <Badge pill bg='danger'>{data.length}</Badge>
          </div>
              {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}

      <div onClick={handle} className='btn bg-white text-success mx-1 '>
                    Logout
      </div>
          </>
      }
  </div>
</nav>
    </>
  )
}

export default Navbar