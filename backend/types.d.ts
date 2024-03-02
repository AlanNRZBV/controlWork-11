import { Model, Types } from 'mongoose';

export interface ProductData {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  title: string;
  description: string;
  image: string | null;
  price: number;
}

export interface UserFields {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
