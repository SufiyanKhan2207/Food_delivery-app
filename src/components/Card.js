import React, {useEffect, useRef, useState} from 'react'
import {useDispatchCart , useCart} from "./ContextReducer";

function Card(props) {
    let dispatch = useDispatchCart()
    let data = useCart()
    const priceRef = useRef()
    let options = props.options
    let priceOptions = Object.keys(options);
    let foodItem = props.foodItem
     const [qty , setQty] = useState(1)
    const [size ,setSize ] = useState('')
     const handleCart=async ()=> {
         let food = []
         for (const item of data) {
             if (item.id === foodItem._id) {
                 food = item;

                 break;
             }
         }
         console.log(food)
         if (food !== []) {
             if (food.size === size) {
                 await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                 return
             }
             else if (food.size !== size) {
                 await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
                 console.log("Size different so simply ADD one more to the list")
                 return
             }
             return
         }

         await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
    }
    let finalPrice = qty * parseInt(options[size])
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
    <div>
        <div className="card mt-3" style={{'width':'18rem'}}>
  <img style={{height:'120px' , objectFit:"fill"}} src={props.foodItem.img} className="card-img-top" alt="CardImg"/>
  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <div className='container w-100'>
        <select onChange={(e)=>setQty(e.target.value)} className='m-2 h-100 bg-success rounded'>
          {Array.from(Array(6),(e,i)=>{
            return(
                <option key={i+1} value={i+1}>
                  {i+1}
                </option>
            )
          })}
        </select>

        <select ref={priceRef} onChange={(e)=>setSize(e.target.value)} className="m-2 h-100 w-20 bg-success text-black rounded" >
            {priceOptions.map((i) => {
                console.log(priceOptions.i)

                return <option key={i} value={i}>{i}</option>

            })}
        </select>


        <div className='d-inline h-100 fs-5'>
            {finalPrice} /
        </div>
    </div>
      <hr/>
      <button onClick={handleCart} className='btn btn-success justify-center ms-2'>
         Add To Cart
      </button>

  </div>
</div>
    </div>
  )
}

export default Card