import { FC } from 'react';
import { ListingReduced } from '../../../types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { apiURL } from '../../../constants.ts';
import { NavLink } from 'react-router-dom';

const ListingsItemReduced: FC<ListingReduced> = ({
  _id,
  price,
  title,
  image,
}) => {
  return (
    <Card sx={{ gridColumn: 'span 4', maxWidth: 345 }}>
      <CardActionArea component={NavLink} to={`/listing/${_id}`}>
        <CardMedia
          component="img"
          height="140"
          image={`${apiURL}/${image}`}
          alt={`${title} image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${price} KGS`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ListingsItemReduced;
