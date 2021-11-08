import { FirebaseError } from 'firebase/app';
import { useMutation } from 'react-query';
import { CreateUserWithCredentialsProperties } from '../models/user-model';
import { createUserWithCredentials } from '../services/user-service';

export const useCreateUser = () => {
  return useMutation<any, FirebaseError, CreateUserWithCredentialsProperties>(
    async (user: CreateUserWithCredentialsProperties) =>
      createUserWithCredentials(user),
  );
};
