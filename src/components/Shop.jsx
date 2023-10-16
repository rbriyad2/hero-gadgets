import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './Cards/ProductCard';
import { addToDB } from '../utils/fakeDB';
import { CartContext, ProductContext } from '../App';
import toast from 'react-hot-toast';

const Shop = () => {
    const products = useContext(ProductContext)
    const [cart, setCart]= useContext(CartContext)
    const productdata = useLoaderData()
    console.log(productdata)



    const handleAddtoCart = product=>{
        let newCart =[]
        const exist = cart.find(existsProduct => existsProduct.id ===product.id)
        if(!exist){
         product.quantity =1  
         newCart = [...cart, product] 
        }
        else{
            const rest =cart.filter(existsProduct => existsProduct.id !==product.id)
            exist.quantity = exist.quantity +1
            newCart = [...rest, exist]
        }
        toast.success('Added Product 🛒')
        setCart(newCart)
        addToDB(product.id)
        
    } 
    return (
        <div className='my-container product-container'>
            {productdata.map(product => (
                <ProductCard key={product.id} product={product} handleAddtoCart={handleAddtoCart}></ProductCard>
            ))}
        </div>
    );
};

export default Shop;