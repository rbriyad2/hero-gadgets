//add data to local storage

const addToDB = (id)=>{
    let shoppingcart ={}

    // get previous data from localStorage
    const storedcart = localStorage.getItem('shopping-cart')
    if(storedcart){
        shoppingcart = JSON.parse(storedcart)
    }

    //add quantity if alredy have product id
    const quantity =shoppingcart[id]
    if(quantity){
        const newQuantity = quantity+1;
        shoppingcart[id] =newQuantity;
    }
    else{
        shoppingcart[id]=1
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingcart))
}

//get stored data from cart
const getstoredCartData = id =>{
let shoppingcart ={}

 // get previous data from localStorage
 const storedcart = localStorage.getItem('shopping-cart')
 if(storedcart){
     shoppingcart = JSON.parse(storedcart)
 }
 return shoppingcart ;
}

//remove product from cart
const removefromDB = id =>{
    //get  previous data from db
    const storedCart = localStorage.getItem('shopping-cart')
    if(storedCart){
        const shoppingCart = JSON.parse(storedCart)
        if(id in shoppingCart){
            delete shoppingCart[id]
            localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart))
        }
    }
}

//clear cart from localStorage
const clearCartLocalstorage = ()=> {
localStorage.removeItem('shopping-cart')
}

export {addToDB, getstoredCartData, removefromDB, clearCartLocalstorage};