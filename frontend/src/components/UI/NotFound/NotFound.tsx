import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Typography variant="h3">
        Whoops! Something went wrong. Get back asap!
      </Typography>
    </Box>
  );
};

export default NotFound;
