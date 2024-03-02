export interface Category {
  _id: string,
  title: string
}

export interface ListingReduced{
  _id:string,
  title:string,
  image:string
  price:string
}
export interface ListingMutation {
  title: string,
  image: File | null,
  price: string,
  description: string,
  categoryId: string
}


export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string,
  phoneNumber: string
}

export interface LoginMutation {
  username: string;
  password: string;
}
export interface User {
  _id: string;
  displayName: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
}
export interface GlobalError {
  error: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
