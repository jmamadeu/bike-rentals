import { Edit as EditIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useContext, useState } from 'react';
import { v4 } from 'uuid';
import { AuthContext } from '../contexts/auth-context';
import { useBikes } from '../hooks/use-bikes';
import useBoolean from '../hooks/use-boolean';
import { useSaveBike } from '../hooks/use-save-bike';
import {
  BikeProperties,
  IBikeFormInputs,
  IRentBikeFormInputs
} from '../models/bike-model';
import { cancelRentedBike, rentBike } from '../services/bike-service';
import { queryClient } from '../services/react-query';
import { BikeForm } from './bike-form';
import { RentBikeForm } from './rent-bike-form';

export function BikesRentals() {
  const { data: bikes } = useBikes();
  const { user } = useContext(AuthContext);
  const {
    isLoading: isBikeLoading,
    error: updateBikeError,
    mutateAsync: updateBike,
  } = useSaveBike();

  const [selectedBike, setSelectedBike] = useState<BikeProperties>(
    {} as BikeProperties,
  );

  const {
    value: isOpenBikeEditDialog,
    setFalse: handleCloseBikeEditDialog,
    setTrue: openBikeModal,
  } = useBoolean(false);

  const {
    value: isOpenBikeRentDialog,
    setFalse: handleCloseBikeRentDialog,
    setTrue: openBikeRentModal,
  } = useBoolean(false);

  const [snackbarOptions, setSnackbarOptions] = useState({
    isOpen: false,
    message: '',
  });

  const handleCloseSnackbar = () =>
    setSnackbarOptions(old => ({ ...old, isOpen: false }));

  async function handleUpdateBike(bike: BikeProperties) {
    setSelectedBike(bike);

    openBikeModal();
  }

  async function onSubmitBikeForm(bike: IBikeFormInputs) {
    try {
      await updateBike({ id: selectedBike.id, ...bike });

      setSnackbarOptions({
        message: 'Bike updated',
        isOpen: true,
      });

      handleCloseBikeEditDialog();
    } catch (error: any) {
      setSnackbarOptions({
        message: error.message,
        isOpen: true,
      });
    }
  }

  async function handleOpenRentModalBike(bike: BikeProperties) {
    openBikeRentModal();

    setSelectedBike(bike);
  }

  async function handleRentBike(rent: IRentBikeFormInputs) {
    try {
      await rentBike({ ...rent, bikeId: selectedBike.id, userId: user.id });

      setSnackbarOptions({
        message: 'Bike Reserved',
        isOpen: true,
      });

      queryClient.invalidateQueries('bikes');
    } catch (err) {}
  }

  async function handleCancelRent(bikeId: string) {
    try {
      await cancelRentedBike(bikeId);

      setSnackbarOptions({
        message: 'Rent canceled',
        isOpen: true,
      });

      queryClient.invalidateQueries('bikes');
      queryClient.invalidateQueries('bike-rentals');
    } catch (err) {}
  }

  return (
    <>
      <Snackbar
        open={snackbarOptions.isOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        message={snackbarOptions.message}
      />

      <Dialog open={isOpenBikeEditDialog} onClose={handleCloseBikeEditDialog}>
        <DialogTitle>Edit Bike</DialogTitle>
        <DialogContent>
          <BikeForm
            onSubmit={onSubmitBikeForm}
            isLoading={isBikeLoading}
            error={updateBikeError?.message}
            defaultValues={selectedBike}
            disabledInputs={{
              color: true,
              isAvailable: true,
              location: true,
              model: true,
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenBikeRentDialog} onClose={handleCloseBikeRentDialog}>
        <DialogTitle>Rent your bike</DialogTitle>
        <DialogContent>
          <RentBikeForm isLoading={false} onSubmit={handleRentBike} />
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Model</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="center">Available</TableCell>
              <TableCell align="center">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bikes?.map(bike => (
              <TableRow
                key={v4()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {bike.model}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      background: bike.color,
                      borderRadius: 2,
                      padding: 0.5,
                      color: '#fff',
                    }}
                  >
                    {bike.color}
                  </Box>
                </TableCell>
                <TableCell align="right">{bike.location}</TableCell>
                <TableCell align="right">{bike.rating}</TableCell>
                <TableCell align="center">
                  {bike.isAvailable ? (
                    <Box sx={{ color: 'green' }}>Yes</Box>
                  ) : (
                    <Box sx={{ color: 'red' }}>No</Box>
                  )}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() => handleUpdateBike(bike)}
                    edge="end"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <Button
                    onClick={() => {
                      if (bike.isAvailable) {
                        handleOpenRentModalBike(bike);
                      } else {
                        handleCancelRent(bike.id);
                      }
                    }}
                  >
                    {bike.isAvailable ? 'Rent' : 'Cancel'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
