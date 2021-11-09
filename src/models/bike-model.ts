export type BikeProperties = {
  id: string;
  model: string;
  color: string;
  location: string;
  rating: number;
  isAvailable: EnumIsAvailable;
  rent: IRentBike
};

export enum EnumIsAvailable {
  true = 'true',
  false = 'false',
}

export type IBikeFormInputs = Omit<BikeProperties, 'id'>;

export type IBikeFormInputsDisabled = {
  id?: boolean;
  model?: boolean;
  color?: boolean;
  location?: boolean;
  rating?: boolean;
  isAvailable?: boolean;
};

export type IRentBike = {
  userId: string;
  from: string;
  to: string;
}

export type IRentBikeProperties = IRentBike & { bikeId: string }

export type IRentBikeFormInputs = Omit<IRentBike, 'userId'>