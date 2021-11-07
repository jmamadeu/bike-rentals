export const USER_ROLES = {
  user: 'user',
  manager: 'manager',
};

export type UserAuthProperties = {
  roles: Array<string>;
};

export type UserProperties = {
  id: string;
  name: string;
  email: string;
  password: string;
} & UserAuthProperties;

export type CreateUserProperties = Omit<UserProperties, 'id'>;
export type CreateUserLoginProperties = Omit<
  UserProperties,
  'id' | 'name' | 'roles'
>;

export type CreateUserResponse = Omit<UserProperties, 'password'>;
