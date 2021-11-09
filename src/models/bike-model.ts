export type BikeProperties = {
  id: string;
  model: string;
  color: string;
  location: string;
  rating: number;
  isAvailable: boolean;
};

export type IBikeFormInputs = Omit<BikeProperties, 'id'>