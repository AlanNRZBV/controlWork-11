import mongoose, { Types } from 'mongoose';
import User from './User';
import Category from './Category';

const Schema = mongoose.Schema

const ProductSchema= new Schema ({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  categoryId:{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    validate: {
      validator: async (value: Types.ObjectId) => {
        const category = await Category.findById(value);
        return Boolean(category);
      },
      message: 'Category does not exist!',
    },
  },
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true,
    validate:{
      validator:  (value: number)=>{
        return value > 0
      },
      message:'Price must be greater than zero'
    }
  },
  image:{
    type: String,
    required:true
  },
})

const Product = mongoose.model('Product', ProductSchema);

export default Product;