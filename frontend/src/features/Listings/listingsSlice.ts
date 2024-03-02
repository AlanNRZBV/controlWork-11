import {ListingReduced} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchListings} from "./listingsThunks.ts";

interface ListingsState{
  listingsReduced: ListingReduced[],
  isReducedListingLoading: boolean
}
const initialState: ListingsState= {
  listingsReduced:[],
  isReducedListingLoading:false
}

export const listingsSlice = createSlice({
  name:'listings',
  initialState,
  reducers:{},extraReducers:builder => {
    builder.addCase(fetchListings.pending,(state)=>{
      state.isReducedListingLoading = true
    });
    builder.addCase(fetchListings.fulfilled,(state,{payload: listings})=>{
      state.isReducedListingLoading = false
      if(listings){
        state.listingsReduced = listings
      }
    });
    builder.addCase(fetchListings.rejected,(state)=>{
      state.isReducedListingLoading = false
    });

  }
})

export const listingsReducer = listingsSlice.reducer
export const reducedListingsState = (state:RootState)=>state.listings.listingsReduced
export const isReducedListingsLoading = (state:RootState)=>state.listings.isReducedListingLoading