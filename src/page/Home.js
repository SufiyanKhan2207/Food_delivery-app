import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

function Home() {
    const [search , setSearch] = useState('')
   const [foodCat , setFoodcat] = useState([])
   const [foodItems , setFooditems] = useState([])
    const loadData = async ()=>{
       let responce = await fetch("http://localhost:5000/api/foodData",{
            method:"POST",
             headers:{
                'Content-Type' : "application/json"
             }
        });
          let api  = await responce.json();
          setFooditems(api[0])
          setFoodcat(api[1])

    }
      useEffect(()=>{
          loadData();
      },[])
    console.log(foodItems)
  return (
    <div>
          <Navbar/>
       <div>
           <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

               <div className="carousel-inner " id='carousel'>
                   <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                       <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                           <input className="form-control me-2 w-75 bg-white text-dark" value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="Type in..." aria-label="Search" />
                           {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                       </div>
                   </div>
                   <div className="carousel-item active" >
                       <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                   </div>
                   <div className="carousel-item">
                       <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                   </div>
                   <div className="carousel-item">
                       <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                   </div>
               </div>
               <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                   <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                   <span className="visually-hidden">Previous</span>
               </button>
               <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                   <span className="carousel-control-next-icon" aria-hidden="true"></span>
                   <span className="visually-hidden">Next</span>
               </button>
           </div>
       </div>
       <div className='container'>
           {
               foodCat!==[]
               ? foodCat.map((data)=>{
                   return (
                       <div className='row mb-3'>
                            <div className=' fs-3 m-3'
                                 key={data.id}>{data.CategoryName}
                            </div>
                           <hr/>
                           {
                               foodItems !==[] ? foodItems.filter((item)=>
                                   ( item.CategoryName  === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                       .map(filterItems=>{
                                       return (
                                           <div className='col-12 col-md-6 col-lg-3
                                           ' key={filterItems.id}>
                                               <Card
                                                   foodItem={filterItems}
                                               options={filterItems.options[0]}
                                               />

                                           </div>
                                       )
                                   })
                                   :<div>no data found</div>
                           }
                       </div>
                   )
                   })
                   : ""
           }
       </div>
           <Footer/>
    </div>
  )
}

export default Home