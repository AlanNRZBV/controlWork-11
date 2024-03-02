import React, { FC } from "react";
import { Category } from "../../../types";
import { ListItem, Typography } from "@mui/material";

const CategoryItem: FC<Category> = ({ _id, title }) => {
  const clickHandler = (_id) => {};

  return (
    <ListItem onClick={clickHandler} component={Typography}>
      {title}
    </ListItem>
  );
};

export default CategoryItem;