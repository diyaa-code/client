import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    logoutCart: (state) => {
      state.quantity = 0;
      state.total = 0;
      state.products = [];
      // state.currentUser = null;
    },
  },
});

export const { addProduct, logoutCart } = cartSlice.actions;
export default cartSlice.reducer;
