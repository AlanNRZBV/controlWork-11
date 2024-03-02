import { ListingReduced, ListingExtended } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchListings, fetchSingleListing } from './listingsThunks.ts';

interface ListingsState {
  listingsReduced: ListingReduced[];
  listingExtended: ListingExtended;
  isReducedLoading: boolean;
  isExtendedLoading: boolean;
  isListView: boolean;
}
//
// listingsReduced: [],
//   listingExtended: {
//   description: '',
//     sellerData: {
//     displayName: '',
//       phoneNumber: '',
//   },
//   title: '',
//     price: '',
//     image: '',
//     category: {
//     _id: '',
//       title: '',
//   },
// },

const initialState: ListingsState = {
  listingsReduced: [],
  listingExtended: {
    description: '',
   displayName:'',
    phoneNumber:'',
    title: '',
    price: '',
    image: '',
    categoryName:''

  },
  isReducedLoading: false,
  isExtendedLoading: false,
  isListView: true,
};

export const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    toggleView: (state) => {
      if (!state.isListView) {
        state.isListView = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListings.pending, (state) => {
      state.isReducedLoading = true;
      state.isListView = true;
    });
    builder.addCase(fetchListings.fulfilled, (state, { payload: listings }) => {
      state.isReducedLoading = false;
      if (listings) {
        state.listingsReduced = listings;
      }
    });
    builder.addCase(fetchListings.rejected, (state) => {
      state.isReducedLoading = false;
    });
    builder.addCase(fetchSingleListing.pending, (state) => {
      state.isExtendedLoading = true;
      state.isListView = false;
    });
    builder.addCase(
      fetchSingleListing.fulfilled,
      (state, { payload: listing }) => {
        console.log('slice ', listing)
        if (listing) {
          state.listingExtended = {
            image: listing.image,
            title: listing.title,
            description: listing.description,
            price: listing.price,
              phoneNumber: listing.userId.phoneNumber,
              displayName: listing.userId.displayName,
            categoryName: listing.categoryId.title
          };
        }
        state.isExtendedLoading = false;
      },
    );
    builder.addCase(fetchSingleListing.rejected, (state) => {
      state.isExtendedLoading = false;
    });
  },
});

export const listingsReducer = listingsSlice.reducer;
export const { toggleView } = listingsSlice.actions;
export const reducedListingsState = (state: RootState) =>
  state.listings.listingsReduced;
export const extendedListingsState = (state: RootState) =>
  state.listings.listingExtended;
export const isReducedListingsLoading = (state: RootState) =>
  state.listings.isReducedLoading;
export const isExtendedListingsLoading = (state: RootState) =>
  state.listings.isExtendedLoading;
export const listViewState = (state: RootState) => state.listings.isListView;
