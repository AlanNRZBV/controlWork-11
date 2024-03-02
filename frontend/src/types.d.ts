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

export interface ListingExtended{
  title: string,
  image:string,
  price:string,
  description:string,
  displayName: string,
  phoneNumber:string
  categoryName: string
}
// export interface ListingExtended{
//   title: string,
//   image:string,
//   price:string,
//   description:string,
//   sellerData: SellerData,
//   category: CategoryData
// }

type SellerData = {
  displayName:string,
  phoneNumber:string
}
type CategoryData = {
  _id:string,
  title:string
}
// export interface SellerData{
//   displayName:string,
//   phoneNumber:string
// }
// export interface CategoryData{
//   _id:string,
//   title:string
// }

export interface ListingExtendedResponse {
    title: string,
  image:string,
  price:string,
  description:string,
  categoryId: CategoryData,
  userId: SellerData
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
