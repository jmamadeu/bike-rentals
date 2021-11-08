import { FirebaseError } from "firebase/app";
import { useMutation } from "react-query";
import { ISaveUser } from "../models/user-model";
import { saveUser } from "../services/user-service";


export function useSaveUser () {
  return useMutation<any, FirebaseError, ISaveUser>(async (user) => await saveUser(user))
}