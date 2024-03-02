import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  isReducedListingsLoading,
  listViewState,
  reducedListingsState,
} from './listingsSlice.ts';
import ListingsItemReduced from './components/ListingsItemReduced.tsx';
import { useEffect } from 'react';
import { fetchListings } from './listingsThunks.ts';
import ListingExtended from './components/ListingExtended.tsx';

const Listings = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(reducedListingsState);
  const isReducedLoading = useAppSelector(isReducedListingsLoading);
  const toggleView = useAppSelector(listViewState);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  return (
    <Box
      gridArea="body"
      mt={2}
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
    >
      {toggleView ? (
        isReducedLoading ? (
          <CircularProgress />
        ) : (
          state.map((item) => (
            <ListingsItemReduced
              _id={item._id}
              title={item.title}
              image={item.image}
              price={item.price}
              key={item._id}
            />
          ))
        )
      ) : (
        <ListingExtended
        />
      )}
    </Box>
  );
};

export default Listings;