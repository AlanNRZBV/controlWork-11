import { Router } from 'express';
import Listing from '../models/Listing';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import { ProductData } from '../types';
import Category from '../models/Category';

const productsRouter = Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const products = await Listing.find();
      if (!products) {
        return res.send({ error: 'No products were identified' });
      }
      return res.send(products);
    }
    const value = req.query.category;

    const products = await Listing.find({categoryId: value}).populate([{
      path: 'userId',
      select: 'displayName -_id phoneNumber',
    },
      {
        path:'categoryId',
        select:'title'
      }
    ]);

    if (!products) {
      return res.send({ message: 'Something went wrong', products});
    }

    return res.send(products);
  } catch (e) {
    next(e);
  }
});

productsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {

      const category = await Category.findById(req.body.categoryId)

      if(!category){
        return res.send({error:'Category not found'})
      }

      const productData: ProductData = {
        userId: req.user?.id,
        categoryId: category?._id,
        title: req.body.title,
        description: req.body.description,
        price: parseInt(req.body.price),
        image: req.file ? req.file.filename : null,
      };

      const product = new Listing(productData);
      await product.save();

      return res.send({ message: 'Listing has been successfully created.' });
    } catch (e) {
      if (e instanceof mongoose.Error) {
        return res.status(422).send({ error: e.message });
      }
      next(e);
    }
  },
);

productsRouter.delete('/', auth, async(req:RequestWithUser, res,next)=>{
  try{
    const product = await Listing.findById(req.body._id)
    if(!product){
      return res.send({error:'No product found'})
    }
    console.log({productUserId: product.userId, reqUserId: req.user?._id})

    if(product.userId && !product?.userId.equals(req.user?._id)){
      return res.send({error:'You can remove only your listings'})
    }

    await Listing.deleteOne({_id:req.body._id})

    return res.send({message: 'Listing successfully removed'})
  }catch (e) {
    if (e instanceof mongoose.Error) {
      return res.status(422).send({ error: e.message });
    }
    next(e);
  }
})


export default productsRouter;
