import {Box, CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {isSidebarLoading, sidebarState} from "./sidebarSlice.ts";
import CategoryItem from "./components/CategoryItem.tsx";
import {useEffect} from "react";
import {fetchSidebarCategories} from "./sidebarThunks.ts";

const SideBar = () => {

  const dispatch=useAppDispatch()
  const state = useAppSelector(sidebarState)
  const isLoading = useAppSelector(isSidebarLoading)

  useEffect(() => {
    dispatch(fetchSidebarCategories())
  }, [dispatch]);

  return (
      <Box gridArea="sidebar">
        {isLoading ? (<CircularProgress/>) : (
            state.map((item)=>(
                <CategoryItem _id={item._id} title={item.title} key={item._id}/>
            ))
        )}
      </Box>
  );
};

export default SideBar;