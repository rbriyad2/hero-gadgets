import { getstoredCartData } from "../utils/fakeDB"

export const productandCartData = async() =>{
    const productdata = await fetch('products.json')
    const products = await productdata.json()
    
    const savedcart = getstoredCartData()
    const cartArray=[]

    for(const id in savedcart){
        const foundProducts = products.find(product => product.id ===id)
        if(foundProducts){
            foundProducts.quantity = savedcart[id]
            cartArray.push(foundProducts)
        }
    }
    return {cartArray, products}
}