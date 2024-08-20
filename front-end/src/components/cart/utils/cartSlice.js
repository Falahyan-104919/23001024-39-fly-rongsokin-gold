import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mitra_id: null,
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeMitra: (state, action) => {
      const payload = action.payload;
      state.mitra_id = payload;
    },
    addProducts: (state, action) => {
      const payload = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.product_id == payload.product_id
      );
      if (productIndex != -1) {
        state.products[productIndex].order_quantity += 1;
        state.products[productIndex].totalProductPrice =
          state.products[productIndex].order_quantity *
          state.products[productIndex].price;
      } else {
        state.products.push(payload);
      }
    },
    removeProducts: (state, action) => {
      const payload = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.product_id === payload.product_id
      );
      if (productIndex != -1) {
        state.products[productIndex].order_quantity -= 1;
        state.products[productIndex].totalProductPrice =
          state.products[productIndex].order_quantity *
          state.products[productIndex].price;
      }
    },
    deleteFromCart: (state, action) => {
      const payload = action.payload;
      const productIndex = state.products.findIndex(
        (product) => (product.product_id = payload.product_id)
      );
      state.products.pop(productIndex);
    },
    resetCart: (state, action) => {
      state.products = [];
    },
  },
});

export const {
  changeMitra,
  addProducts,
  removeProducts,
  deleteFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice;

export const getCurrentMitra = (state) => state.cart.mitra_id;
export const getAllProducts = (state) => state.cart.products;
export const getTotalProducts = (state) => state.cart.products.length;
export const getTotalPrice = (state) =>
  state.cart.products.reduce(
    (total, product) => total + product.totalProductPrice,
    0
  );
