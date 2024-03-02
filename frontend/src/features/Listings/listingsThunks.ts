import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {
  ListingExtendedResponse,
  ListingMutation,
  ListingReduced,
} from '../../types';
import { RootState } from '../../app/store.ts';

export const fetchListings = createAsyncThunk('listings/fetch', async () => {
  try {
    const response = await axiosApi.get<ListingReduced[]>('/listings');
    return response.data;
  } catch (e) {
    console.log('Caught on try - FETCH LISTINGS - ', e);
  }
});

export const submitListing = createAsyncThunk<
  null,
  ListingMutation,
  { state: RootState }
>("listings/submit", async (arg, { getState }) => {
  try {
    const token = getState().users.user?.token;
    const formData = new FormData();
    const keys = Object.keys(arg) as (keyof ListingMutation)[];
    keys.forEach((key) => {
      const value = arg[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post('/listings', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    console.log("Caught on try - SUBMIT LISTING -", e);
  }
});

export const fetchSingleListing = createAsyncThunk<
  ListingExtendedResponse | undefined,
  string
>('listings/fetchSingle', async (arg) => {
  try {
    const response = await axiosApi.get<ListingExtendedResponse>(
      `/listings?listingById=${arg}`,
    );
      return response.data

  } catch (e) {
    console.log('Caught on try - FETCH SINGLE THREAD - ', e);
  }
});
