import React, { createContext, useContext, useReducer } from 'react'
// Create cart state context and cart dispatch context
const cartStateContext =createContext()

const cartDispatchContext=createContext()

// Define the reducer function

const reducer=(state,action)=>{
switch(action.type){
    case 'ADD':
        // Add a new item to the cart
        return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,
            price:action.price,img:action.img}]
        case "REMOVE":
            // Remove an item from the cart based on the index
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
            case "UPDATE":
             // Update the quantity and price of an item in the cart
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
            case "DROP":
               // Clear the cart by returning an empty array
            let empArray = []
            return empArray
        default:
            console.log("error in reducer");
}
}
export const CartProvider=({children})=>{
     // Use reducer to manage the cart state and initialize it as an empty array
 
    const [state,dispatch]=useReducer(reducer,[])

    return(
         // Provide the cart state value to components within the cartStateContext
        <cartStateContext.Provider value={state}>
         {/* Provide the dispatch function to components within the cartDispatchContext */}
        <cartDispatchContext.Provider value={dispatch}>
         {/* Render the children components */}
          {children}
        </cartDispatchContext.Provider>
      </cartStateContext.Provider>
    )
}

export const useCart=()=>useContext(cartStateContext)
export const useDispatchCart=()=>useContext(cartDispatchContext)