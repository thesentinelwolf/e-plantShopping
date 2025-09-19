import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items) || [];
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = (cart) => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.cost.substring(1));
            const quantity = item.quantity || 1;
            return total + price * quantity;
        }, 0).toFixed(2);
    };

    const calculateTotalQuantity = (cart) => {
        return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        const quantity = item.quantity || 1;
        return (price * quantity).toFixed(2);
    };

    // For cart icon: total quantity
    // Use calculateTotalQuantity(cart) wherever you render the cart icon

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
            <h3 style={{ color: 'black' }}>Total Items in Cart: {calculateTotalQuantity(cart)}</h3>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;


