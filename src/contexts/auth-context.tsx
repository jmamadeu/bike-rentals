import React, { createContext } from 'react';
import { CreateUserProperties } from '../models/user-model';

interface AuthContextProperties {
  signIn: (email: string, password: string) => void;
  signUp: (user: CreateUserProperties) => void;
}

export const AuthContext = createContext<AuthContextProperties>(
  {} as AuthContextProperties,
);

export const AuthProvider: React.FC = ({ children }) => {
  function signUp(user: CreateUserProperties) {}

  return <AuthContext value={{ signUp }}>{children}</AuthContext>;
};
