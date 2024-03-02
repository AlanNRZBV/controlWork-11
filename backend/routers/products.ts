import { Router } from 'express';
import Product from '../models/Product';

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

export default productsRouter;
