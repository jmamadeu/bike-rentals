export const USER_ROLES = {
  user: 'user',
  manager: 'manager',
};

export type UserProperties = {
  id: string;
  name: string;
  email: string;
  roles: Array<string>;
};

export type CreateUserProperties = Omit<UserProperties, 'id'>;

export type CreateUserWithCredentialsProperties = Omit<UserProperties, 'id'> & {
  password: string;
};
