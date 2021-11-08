import { FirebaseError } from 'firebase/app';
import { useMutation } from 'react-query';
import { ISaveUser } from '../models/user-model';
import { queryClient } from '../services/react-query';
import { saveUser } from '../services/user-service';

export function useSaveUser() {
  return useMutation<any, FirebaseError, ISaveUser>(
    async user => await saveUser(user),
    {
      onMutate: data => {
        const oldUsers = queryClient.getQueryData<ISaveUser[]>('users');

        

        return () => oldUsers;
      },
      onError: (err, newUser, rollback: any) => {
        if (rollback) rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries('users');
      },
    },
  );
}
