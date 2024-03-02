import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';
import React, { FC, useState } from 'react';
import { ListingMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { fetchListings, submitListing } from '../listingsThunks.ts';
import { sidebarState } from '../../SideBar/sidebarSlice.ts';

interface Props {
  closeHandler: () => void;
}

const AddThreadForm: FC<Props> = ({ closeHandler }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(sidebarState);

  const [state, setState] = useState<ListingMutation>({
    image: null,
    title: '',
    description: '',
    price: '',
    categoryId: '',
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(submitListing(state)).unwrap();
      await dispatch(fetchListings());
      setState({
        image: null,
        title: '',
        description: '',
        price: '',
        categoryId: '',
      });
      closeHandler();
    } catch (e) {
      console.log('Caught on try - SUBMIT FORM - ', e);
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const selectChangeHandler = (event: SelectChangeEvent) => {
    setState((prevState) => {
      return { ...prevState, categoryId: event.target.value as string };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <>
      <Typography variant="body1" mb={2}>
        Create listing!
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={submitHandler}
      >
        <TextField
          type="text"
          id="title"
          label="Title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          required
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          type="text"
          id="description"
          label="Description"
          value={state.description}
          onChange={inputChangeHandler}
          name="description"
          sx={{ marginBottom: '16px' }}
          required
        />
        <TextField
          type="number"
          id="price"
          label="Price"
          value={state.price}
          onChange={inputChangeHandler}
          name="price"
          sx={{ marginBottom: '16px' }}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.categoryId}
            label="category"
            onChange={selectChangeHandler}
          >
            {categories.map((item) => (
              <MenuItem value={item._id}>{item.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
        />

        <Button type="submit" variant="contained" sx={{ marginTop: '16px' }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AddThreadForm;
