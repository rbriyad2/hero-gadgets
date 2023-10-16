import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import About from './components/About';
import Shop from './components/Shop';
import Cart from './components/Cart';
import { productandCartData } from './loaders/getcardandproductData';
import { Toaster } from 'react-hot-toast';


const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      loader: productandCartData,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path:'/about',
            element: <About></About>
        },
        {
            path: '/shop',
            element: <Shop></Shop>,
            loader: ()=> fetch('products.json')
        },
        {
            path: '/cart',
            element: <Cart></Cart>
            
        }
      ]
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <RouterProvider router={router}>
    </RouterProvider>
    <Toaster></Toaster>
    </>
)
