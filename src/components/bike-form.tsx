import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IBikeFormInputs, IBikeFormInputsDisabled } from '../models/bike-model';

export type BikeFormProperties = {
  defaultValues?: IBikeFormInputs;
  onSubmit: (user: IBikeFormInputs) => void;
  error?: string;
  isLoading: boolean;
  disabledInputs?: IBikeFormInputsDisabled;
};

export const BikeForm = ({
  error,
  isLoading,
  defaultValues,
  onSubmit,
  disabledInputs,
}: BikeFormProperties) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IBikeFormInputs>({
    defaultValues,
  });

  const getFormData: SubmitHandler<IBikeFormInputs> = user => onSubmit(user);

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
            {...register('model', { required: true })}
            required
            id="model"
            type="text"
            label="Model"
            fullWidth
            autoFocus={true}
            disabled={disabledInputs?.model}
          />
          <TextField
            {...register('color', { required: true })}
            required
            id="color"
            type="color"
            label="Color"
            fullWidth
            disabled={disabledInputs?.color}
          />
          <TextField
            {...register('location', { required: true })}
            required
            id="location"
            type="text"
            label="Location"
            fullWidth
            disabled={disabledInputs?.location}
          />
          <TextField
            {...register('rating', { required: true, min: 0, max: 5 })}
            required
            id="rating"
            type="number"
            label="Rating"
            fullWidth
            disabled={disabledInputs?.rating}
          />
          <Controller
            control={control}
            name="isAvailable"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="available">Is Available</InputLabel>
                <Select
                  {...field}
                  labelId="available"
                  id="available"
                  label="Is Available"
                  {...register('isAvailable')}
                  disabled={disabledInputs?.isAvailable}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            )}
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
