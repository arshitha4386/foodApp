import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatchCart, useCart } from './ContextReducer';
import './Components.css'


function ProductCard(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef()
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                 // Update the item in the cart
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                // Add a new item to the cart
                await dispatch({
                    type: 'ADD',
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    img: props.foodItem.img,
                    price: finalPrice,
                    qty: qty,
                    size: size
                });
                return
            }
                return
            }
             // Add a new item to the cart
            await dispatch({
                type: 'ADD',
                id: props.foodItem._id,
                name: props.foodItem.name,
                img: props.foodItem.img,
                price: finalPrice,
                qty: qty,
                size: size
            });
        };
        let finalPrice = qty * parseInt(options[size])
        useEffect(() => {
             // Set the initial size based on the priceRef value
            setSize(priceRef.current.value)
        }, [])
        return (

            <div className='ms-3 mt-3'>
                <Card className='mt-3 foodCard' style={{ width: '18rem', maxHeight: '560px' }}>
                    <Card.Img variant="top" src={props.foodItem.img} style={{ height: '220px', objectFit: "fill" }} />
                    <Card.Body>
                        <Card.Title>{props.foodItem.name}</Card.Title>
                        <Card.Text>
                            {props.foodItem.description}
                        </Card.Text>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success' onChange={(e) => setQty(e.target.value)}>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>

                            <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {
                                    priceOptions.map((data) => {
                                        return <option key={data} value={data}>{data}</option>
                                    })
                                }
                            </select>

                            <div className='d-inline h-100 fs-5'>{finalPrice}Rs/-</div>
                        </div>
                        <hgroup />
                        <Button className='btn btn-success justify-content-center ms-2' style={{color:"white"}} onClick={handleAddToCart}>Add to cart</Button>
                    </Card.Body>
                </Card>

            </div>

        )
    }

    export default ProductCard