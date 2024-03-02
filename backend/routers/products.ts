import { Router } from 'express';
import Product from '../models/Product';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import { ProductData } from '../types';
import Category from '../models/Category';

const productsRouter = Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const products = await Product.find();
      if (!products) {
        return res.send({ error: 'No products were identified' });
      }
      return res.send(products);
    }
    const value = req.query.category;

    const products = await Product.find({categoryId: value}).populate([{
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

      const product = new Product(productData);
      await product.save();

      return res.send({ message: 'Product has been successfully created.' });
    } catch (e) {
      if (e instanceof mongoose.Error) {
        return res.status(422).send({ error: e.message });
      }
      next(e);
    }
  },
);

export default productsRouter;
