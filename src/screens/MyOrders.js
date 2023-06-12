import {React,useEffect,useState} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyOrders() {

    const [orderData,setOrderData]=useState("")

    const fetchMyOrder=async ()=>{
        console.log(localStorage.getItem("userEmail"));
        await fetch("http://localhost:8000/api/myOrderData",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                email:localStorage.getItem("userEmail")
            })
        }).then(async (res)=>{
            let response=await res.json()
            await setOrderData(response)
        })
    }

    useEffect(()=>{
        fetchMyOrder()
    },[])
  return (
    <div>
    <div><Header></Header></div>

    <div className='container'>
    <div className='row'>

        {orderData !== {} ? Array(orderData).map(data => {
            return (
                data.orderData ?
                    data.orderData.order_data.slice(0).reverse().map((item) => {
                        return (
                            item.map((arrayData) => {
                                return (
                                    <div>
                                        {arrayData.Order_date ? <div className='m-auto mt-5'>

                                            {data = arrayData.Order_date}
                                            <hr />
                                        </div> :

                                            <div> 
                                            

                                                <div className="card mt-3 border border-dark"  style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <div className="card-body p-4 ">
                                                    <img src={arrayData.img} className="card-img-top" alt="..." style={{height: "120px", objectFit: "fill" }} />

                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{arrayData.size}</span>
                                                            <span className='m-1'>{data}</span>
                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                               

                                            </div>



                                        }

                                    </div>
                                )
                            })

                        )
                    }) : ""
            )
        }) : ""}
    </div>


</div>


   <div> <Footer></Footer></div>
    </div>
  )
}

export default MyOrders