import { Router } from 'express';
import Listing from '../models/Listing';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import { ProductData } from '../types';
import Category from '../models/Category';

const listingsRouter = Router();

listingsRouter.get('/', async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const products = await Listing.find();
      if (!products) {
        return res.send({ error: 'No listings were identified' });
      }
      return res.send(products);
    }

    if ('listingById' in req.query) {
      const value = req.query.listingById;

      const listing = await Listing.findOne({ _id: value }).populate([
        {
          path: 'userId',
          select: 'displayName phoneNumber',
        },
        {
          path: 'categoryId',
          select: 'title',
        },
      ]);

      if (!listing) {
        return res.send({ message: 'Something went wrong', listing: listing });
      }

      return res.send(listing);
    } else if ('listingByCategory' in req.query) {
      const value = req.query.listingByCategory;
      const listings = await Listing.find({ categoryId: value }).populate([
        {
          path: 'userId',
          select: 'displayName -_id phoneNumber',
        },
        {
          path: 'categoryId',
          select: 'title',
        },
      ]);

      if (!listings) {
        return res.send({
          message: 'Something went wrong',
          listings: listings,
        });
      }

      return res.send(listings);
    }

    return res.send({ message: 'Something went wrong' });
  } catch (e) {
    next(e);
  }
});

listingsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const category = await Category.findById(req.body.categoryId);

      if (!category) {
        return res.send({ error: 'Category not found' });
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

listingsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.send({ error: 'No listing found' });
    }

    if (listing.userId && !listing?.userId.equals(req.user?._id)) {
      return res.send({ error: 'You can remove only your listings' });
    }

    await Listing.deleteOne({ _id: req.params.id });

    return res.send({ message: 'Listing successfully removed' });
  } catch (e) {
    if (e instanceof mongoose.Error) {
      return res.status(422).send({ error: e.message });
    }
    next(e);
  }
});

export default listingsRouter;
