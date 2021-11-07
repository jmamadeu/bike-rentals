import { useMutation } from 'react-query';
import { CreateUserProperties } from '../models/user-model';
import { createUser } from '../services/user-service';

export const useCreateUser = () => {
  return useMutation((user: CreateUserProperties) => {
    return createUser(user);
  });
};
