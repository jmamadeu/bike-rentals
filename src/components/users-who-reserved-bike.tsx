import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { v4 } from 'uuid';
import { useBikesRentals } from '../hooks/use-bikes-rentals';
import { useUsers } from '../hooks/use-users';

export function UsersWhoReservedBike() {
  const { data: users } = useUsers();
  const { data: bikes } = useBikesRentals();

  const getUser = (userId: string) => users?.find(u => u.id === userId);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">From</TableCell>
              <TableCell align="right">To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bikes?.map(bike => (
              <TableRow
                key={v4()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">
                  {getUser(bike?.rent?.userId)?.name}
                </TableCell>

                <TableCell align="right">
                  {getUser(bike?.rent?.userId)?.email}
                </TableCell>
                <TableCell align="right">{bike?.rent?.from}</TableCell>
                <TableCell align="right">{bike?.rent?.to}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
