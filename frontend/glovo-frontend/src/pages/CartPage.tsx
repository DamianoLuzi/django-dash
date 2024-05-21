import axios from "axios";
import { useState, useEffect} from "react";
import "../styles/App.css"
function CartPage (props: any) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  console.log("cart items", props.cartItems)
  const handlePlaceOrder = async () => {
   try {
    const orderData = {
      'user' : props.user,
      'items' : props.cartItems,
      'price': props.cartItems.reduce((total: number, item: any) => total + item.price, 0)
    }
    const response = await axios.post(`http://localhost:8000/${props.user.ruolo}/${props.user.username}/orders`, orderData)
    if(response) {
      setMessage('Order successfully placed!')
      props.setCartItems([])
    }
   } catch (error:any) {
      console.log("POST error", error)
      if (error.response && (error.response.status === 500 || error.response.status === 400 )) {
        setError(error.response.data);
      } else {
        setError('An unexpected error occurred');
      }
   }
  }

  useEffect(() => {
    props.setCartItems(props.cartItems);
  }, [props.cartItems]);
  
  //selected items have been set as useState, might need to be stored in the DB
  return(
    <>
    {message && <h1>{message}</h1>}
    {error && <h1>Error: {error}</h1>}
    <h1>Your cart:</h1>
    <ul className="card-list">
    {props.cartItems && props.cartItems.map((item:any) => (
      <li className="card">
        <h3>{item.name} - {item.price} €</h3> 
      </li>
    ))}
    </ul>
    <h2>Total: {props.cartItems.reduce((total: number, item: any) => total + item.price, 0)} €</h2>
    {props.cartItems.length != 0 && <button className="button" onClick={handlePlaceOrder}>Pay</button>}
    {<button className="button" onClick={() => props.setCartItems([])}>Cancel</button>}
    </>
  )
}

export default CartPage;