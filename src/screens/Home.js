import { React, useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import Carousel from 'react-bootstrap/Carousel';



function Home() {
    const [search, setSearch] = useState("")

    const [foodCategory, setfoodCategory] = useState([])
    const [foodItem, setfoodItem] = useState([])
    const loadData = async () => {
      // Sending a POST request to the specified URL
        let response = await fetch('http://localhost:8000/api/foodApp', {
            method: "POST",
            headers: {
              // indicates that the request body will be in JSON format.
                "Content-Type": "application/json"
            }
        })
        response = await response.json()
        // console.log(response[0],response[1]);
        setfoodItem(response[0])
        setfoodCategory(response[1])
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div >
            <div><Header></Header></div>
           
            <div>
            
            <div>
            <Carousel fade indicators={false} controls={false} interval={1000}>
            <Carousel.Item id="carousel" style={{objectFit:'contain !important'}}>
              <img
                className="d-block w-100"
                src="https://source.unsplash.com/random/900x700/?burger"
                alt="First slide"
                style={{filter:"brightness(50%"}}
              />
              <Carousel.Caption style={{zIndex:"10"}}>
              <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" 
              aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
               <button className="btn btn-outline-success text-light " type="submit">Search</button>
            </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item id="carousel">
              <img
                className="d-block w-100"
                src="https://source.unsplash.com/random/900x700/?soup"
                alt="Second slide"
                style={{filter:"brightness(30%"}}
        
              />
        
              <Carousel.Caption>
              <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" 
              aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button className="btn btn-success" type="submit">Search</button>
            </form>
              </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item id="carousel">
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/900x700/?Tiramisu"
                  alt="Third slide"
                  style={{filter:"brightness(30%"}}
        
                />
        
                <Carousel.Caption>
                <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" 
                aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

            </div>
            </div>
            <div className='container'>
                {
                    foodCategory !==[] ? foodCategory.map(data => {
                        return (
                            <div className='row mb-3 '>
                                <div key={data._id} className='fs-3 m-3'>{data.categoryName}</div><hr/>
                                {foodItem !== [] ? foodItem.filter((item) => (item.categoryName ===data.categoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                                     .map
                                    (filterItems => {
                                        return (
                                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                                                <ProductCard foodItem={filterItems}
                                                options={filterItems.options[0]}
                                                
                                                 />
                                            </div>
                                        )
                                    }
                
                    ):<div>no data found</div>}
                            </div>
                        )
                    }) : " "
                }


            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Home