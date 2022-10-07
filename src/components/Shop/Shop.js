import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import CartItem from '../CartItem/CartItem';
import Product from '../Product/Product';
import './Shop.css';


const Shop = () => {
    const products = useLoaderData()
    const [cart, setCart] = useState([])

    

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCard = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCard.push(addedProduct);
            }
        }
        setCart(savedCard);
    }, [products]);

    const handleAddToCart = (product) => {
        let newCart = [];
        const exists = cart.find(findProduct => findProduct.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else{
            const rest = cart.filter(findProduct => findProduct.id !== product.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(product.id)

    }


    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <CartItem cart={cart}></CartItem>

                {/* {
                    cart.map(cartItem => <CartItem
                        key={cartItem.id}
                        cartItem={cartItem}
                    ></CartItem>)
                } */}

            </div>
        </div>
    );
};

export default Shop;