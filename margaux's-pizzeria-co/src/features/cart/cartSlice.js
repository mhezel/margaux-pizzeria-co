import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemsToCart(state, action){
           state.cart.push(action.payload) //payload == newItem
        },
        deleteItemsToCart(state, action){ //payLoad == pizzaID
           state.cart = state.cart.filter((item) => (item.pizzaId !== action.payload));
        },
        incQuantityItemsToCart(state, action){ //payload == pizzaID
            const item = state.cart.find((item) => item.pizzaId === action.payload);

            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decQuantityItemsToCart(state, action){ //payload == pizzaID
            const item = state.cart.find((item) => item.pizzaId === action.payload);

            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        clearItemsToCart(state){
            state.cart = [];
        },
    },
});

export const
    {
        addItemsToCart, 
        decQuantityItemsToCart, 
        incQuantityItemsToCart, 
        deleteItemsToCart, 
        clearItemsToCart
    } = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getNumberOfPizzas = 
    (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalAmountPriceOfPizzas = 
    (state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentCartQuantityById = (id) => 
    (state) => state.cart.cart.find((item) => item.pizzaId === id)?. quantity ?? 0;

export default cartSlice.reducer;