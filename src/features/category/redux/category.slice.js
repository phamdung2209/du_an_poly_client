import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { categoryApi } from './../api/category.api';

export const getProducts = createAsyncThunk(
  'category/getProducts',
  async () => {
    try {
      const response = await categoryApi.getProducts();
      return response.data;
    } catch (error) {}
  }
);
export const getProductMajor = createAsyncThunk("category/productMajors", async (id)=>{
       try {
        const response = await categoryApi.productMajor(id)
        console.log("ở đây", response)
       } catch (error) {
        console.log("ở đây lỗi", error) 
       }
})
export const getMajors = createAsyncThunk('category/getMajors', async () => {
  try {
    const response = await categoryApi.getMajors();
    return response.data;
  } catch (error) {}
});
export const getSubjects = createAsyncThunk('category/getMajors', async () => {
  try {
    const response = await categoryApi.getSubject();
    return response.data.data;
  } catch (error) {}
});

const initialState = {
  isLoadingProducts: false,
  listProduct: [],
  listSubject : []
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoadingProducts = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoadingProducts = false;
      state.listProduct = action.payload.data;
    },
    [getProducts.rejected]: (state) => {
      state.isLoadingProducts = false;
    },

    [getSubjects.fulfilled]: (state, action) => {
      state.listSubject = action.payload;
    },
    [getSubjects.rejected]: (state) => {
      state.listSubject = [];
    },
  },
});

const { reducer: categoryReducer } = categorySlice;

export default categoryReducer;
