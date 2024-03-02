import {Box, CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {isReducedListingsLoading, reducedListingsState} from "./listingsSlice.ts";
import ListingsItemReduced from "./components/ListingsItemReduced.tsx";
import {useEffect} from "react";
import {fetchListings} from "./listingsThunks.ts";

const Listings = () => {

  const dispatch=useAppDispatch()
  const state = useAppSelector(reducedListingsState)
  const isReducedLoading = useAppSelector(isReducedListingsLoading)

  useEffect(() => {
    dispatch(fetchListings())
  }, [dispatch]);

  return (
      <Box gridArea="body" mt={2} display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        {isReducedLoading ? (<CircularProgress/>) : (
            state.map((item)=>(
                <ListingsItemReduced _id={item._id} title={item.title} image={item.image} price={item.price} key={item._id}/>
            ))
        )}
      </Box>
  );
};

export default Listings;