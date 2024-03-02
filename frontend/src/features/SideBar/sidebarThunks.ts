import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Category} from "../../types";

export const fetchSidebarCategories = createAsyncThunk('sidebar/fetchCategories',
    async()=>{
  try {
    const response = await axiosApi.get<Category[]>('/categories')
    return response.data
  }catch (e) {
    console.log('Caught on try - FETCH SIDEBAR CATEGORIES - ', e)
  }
    })