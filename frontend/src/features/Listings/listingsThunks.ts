import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {ListingReduced} from "../../types";

export const fetchListings = createAsyncThunk('listings/fetch',
    async()=>{
  try{
    const response = await axiosApi.get<ListingReduced[]>('/listings')
    return response.data
  }catch (e) {
    console.log('Caught on try - FETCH LISTINGS - ', e)
  }
    })