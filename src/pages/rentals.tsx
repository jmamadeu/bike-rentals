import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { BikeForm } from '../components/bike-form';
import { BikesFilteredList } from '../components/bikes-filtered-table';
import { BikesRentals } from '../components/bikes-rentals';
import { Menu } from '../components/menu';
import useBoolean from '../hooks/use-boolean';
import { useCreateBike } from '../hooks/use-create-bike';
import { IBikeFormInputs } from '../models/bike-model';

const Bikes: NextPage = () => {
  const {
    value: isOpen,
    setFalse: handleClose,
    setTrue: handleOpen,
  } = useBoolean(false);

  const { isLoading, mutateAsync, error } = useCreateBike();

  const onSubmit = async (bike: IBikeFormInputs) => {
    try {
      await mutateAsync(bike);

      handleClose();
    } catch (err) {}
  };

  return (
    <div>
      <Head>
        <title>Bike Rentals - Bikes management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Add new Bike</DialogTitle>
        <DialogContent>
          <BikeForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error?.message}
          />
        </DialogContent>
      </Dialog>

      <Menu>
        <Box sx={{ marginTop: 2 }}>
        <Typography variant="h4">
          Rent or cancel your bike
          </Typography>
          <BikesRentals />
        </Box>
        <Box sx={{ marginTop: 6 }}>
          <Typography variant="h4">
            Bikes Rentals - Search
          </Typography>
          <BikesFilteredList />
        </Box>
      </Menu>
    </div>
  );
};

export default Bikes;
