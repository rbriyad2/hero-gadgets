import React, { useContext } from "react";
import { clearCartLocalstorage, removefromDB } from "../utils/fakeDB";
import { Link } from "react-router-dom";
import CartItem from "./Cards/CartItem";
import { CartContext } from "../App";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart]= useContext(CartContext)
  let total = 0;
  if (cart.length > 0) {
    for (const product of cart) {
      total = total + product.price * product.quantity;
    }
  }

  //remove item from shopping cart
  const handleRemoveItem = (id)=>{
    const remaining = cart.filter(product => product.id !== id)
    toast.error('Product Removed! 🔥')
    setCart(remaining)
    removefromDB(id)
  }

//clear cart from localstorage
  const handleclearCart =()=>{
    setCart([])
    clearCartLocalstorage()
    toast.error('All Items Removed! 🔥')
  }

//place order
const orderHandler = ()=>{
  if(cart.length > 0){
    setCart([])
    clearCartLocalstorage()
    return toast.success('Order Done')
  }
  toast.error('Cart Empty')
}
  return (
    <div className="flex min-h-screen justify-center items-start bg-gray-100 text-gray-900">
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10">
        <h2 className="text-xl font-semibold">
          {" "}
          {cart.length ? "Review Cart Items" : "Cart is EMPTY!"}
        </h2>
        <ul className="flex flex-col devide-y devide-gray-700">
          {cart.map((product) => (
            <CartItem key={product.id} product={product} handleRemoveItem={handleRemoveItem}></CartItem>
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount: <span className="font-semibold">{total}$</span>
          </p>
          <p className="text-sm text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          {cart.length ? (
            <button onClick={handleclearCart} type="button" className="btn-outlined">
              Clear <span className="sr-only sm:not-sr-only">Cart</span>
            </button>
          ) : (
            <Link to='/shop'><button type="button" className="btn-outlined">
            Back <span className="sr-only sm:not-sr-only">To Shop</span>
          </button></Link>
          )}
          <button onClick={orderHandler} type="button" className="btn-primary">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
