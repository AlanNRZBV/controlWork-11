import { Router } from 'express';
import Category from '../models/Category';

const categoriesRouter = Router();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.send({ error: 'No categories were identified' });
    }

    return res.send(categories);
  } catch (e) {
    next(e);
  }
});

export default categoriesRouter;
