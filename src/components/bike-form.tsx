import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IBikeFormInputs } from '../models/bike-model';

export type BikeFormProperties = {
  defaultValues?: IBikeFormInputs;
  onSubmit: (user: IBikeFormInputs) => void;
  error?: string;
  isLoading: boolean;
};

export const BikeForm = ({
  error,
  isLoading,
  defaultValues,
  onSubmit,
}: BikeFormProperties) => {
  const { register, handleSubmit } = useForm<IBikeFormInputs>({
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
          />
          <TextField
            {...register('color', { required: true })}
            required
            id="color"
            type="color"
            label="Color"
            fullWidth
          />
          <TextField
            {...register('location', { required: true })}
            required
            id="location"
            type="text"
            label="Location"
            fullWidth
          />
          <TextField
            {...register('rating', { required: true, min: 0, max: 5 })}
            required
            id="rating"
            type="number"
            label="Rating"
            fullWidth
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  {...register('isAvailable', {
                    value: defaultValues?.isAvailable,
                  })}
                  defaultChecked
                />
              }
              label="Available ?"
            />
          </FormGroup>
        </Box>
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
          <br />
        </Box>
      </Box>
    </section>
  );
};
