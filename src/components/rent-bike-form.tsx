import { LoadingButton } from '@mui/lab';
import { Alert, Box, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRentBikeFormInputs } from '../models/bike-model';

export type RentBikeFormProperties = {
  onSubmit: (user: IRentBikeFormInputs) => void;
  error?: string;
  isLoading: boolean;
};

export const RentBikeForm = ({
  error,
  isLoading,
  onSubmit,
}: RentBikeFormProperties) => {
  const { register, handleSubmit } = useForm<IRentBikeFormInputs>();

  const getFormData: SubmitHandler<IRentBikeFormInputs> = user =>
    onSubmit(user);

  return (
    <section>
      <Box
        component="form"
        onSubmit={handleSubmit(getFormData)}
        style={{ width: '50ch' }}
        sx={{
          '& .MuiPaper-root': { m: 1, width: '100%' },
          '& .MuiFormControl-root': { m: 1 },
          '& .MuiFormGroup-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        {error && (
          <Alert severity="error" color="error">
            {error}
          </Alert>
        )}

        <Box style={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            {...register('from', { required: true })}
            required
            id="from"
            type="date"
            label="From"
            fullWidth
          />
          <TextField
            {...register('to', { required: true })}
            required
            id="to"
            type="date"
            label="To"
            fullWidth
          />

          <Box style={{ margin: '8px' }}>
            <LoadingButton
              sx={{
                marginBottom: 1,
                '.MuiLoadingButton-startIconLoadingStart': {
                  marginRight: 1,
                },
              }}
              loading={isLoading}
              variant="outlined"
              type="submit"
              loadingIndicator="Saving"
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </section>
  );
};
