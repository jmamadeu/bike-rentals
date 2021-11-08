import React, { createContext } from 'react';
import { CreateUserProperties } from '../models/user-model';

interface AuthContextProperties {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (user: CreateUserProperties) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProperties>(
  {} as AuthContextProperties,
);

export const AuthProvider: React.FC = ({ children }) => {
  async function signUp(user: CreateUserProperties) {}

  async function signIn(email: string, password: string) {}

  return (
    <AuthContext.Provider value={{ signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
