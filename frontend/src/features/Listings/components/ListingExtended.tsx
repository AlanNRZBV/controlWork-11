import { Box, CircularProgress, Link, Typography } from '@mui/material';
import Image from 'mui-image';
import { apiURL } from '../../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import {
  extendedListingsState,
  isExtendedListingsLoading,
} from '../listingsSlice.ts';
import { useEffect } from 'react';
import { fetchSingleListing } from '../listingsThunks.ts';
import { useParams } from 'react-router-dom';

const ListingExtended = () => {
  const stateExtended = useAppSelector(extendedListingsState);
  const isExtendedLoading = useAppSelector(isExtendedListingsLoading);
  const dispatch = useAppDispatch()
  const listingId = useParams()

  console.log(stateExtended)

  useEffect(() => {
    dispatch(fetchSingleListing(listingId.id as string))
  }, [dispatch, listingId.id]);


  return (
    <>
      {isExtendedLoading ? (
        <CircularProgress />
      ) : (
        <Box display="flex" flexDirection="column">
          <Image src={`${apiURL}/${stateExtended.image}`} alt="listing image" width="50%"/>
          <Typography color="green" fontStyle="italic"> Price {stateExtended.price} KGS</Typography>
          <Typography mt={2}>Category : {stateExtended.categoryName}</Typography>
          <Typography mt={2} variant="h6">{stateExtended.title}</Typography>
          <Typography mt={2} component={Link} href={`tel:${stateExtended.phoneNumber}`}>{stateExtended.phoneNumber}</Typography>
          <Typography mt={2}>Seller name: {stateExtended.displayName}</Typography>
          <Typography mt={2}>{stateExtended.description}</Typography>
        </Box>
      )}
    </>
  );
};

export default ListingExtended;