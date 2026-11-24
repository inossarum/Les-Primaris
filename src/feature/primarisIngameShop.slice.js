import {createSlice} from "@reduxjs/toolkit";

export const primarisIngameShopSlice = createSlice({
  name: "primarisIngameShop",
  initialState: {
    isAddingANewProduct: false,
    products: [],
    productsSearchResult: [],
  },
  reducers: {
    getAllProducts: (state, {payload}) => {
      state.products = payload;
    },
    setProductsSearchResult: (state, {payload}) => {
      state.productsSearchResult = payload;
    },
    setIsAddingANewProduct: (state, {payload}) => {
      state.isAddingANewProduct = payload;
    },
  },
});

export const {getAllProducts, setIsAddingANewProduct, setProductsSearchResult} =
  primarisIngameShopSlice.actions;
export default primarisIngameShopSlice.reducer;
