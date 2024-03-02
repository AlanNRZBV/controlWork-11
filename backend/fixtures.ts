import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Category from './models/Category';
import Listing from './models/Listing';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    const collections = ['products', 'categories', 'users'];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await User.create([
      {
        username: 'user',
        password: '5str0ngPswrd',
        displayName: 'DontClickOnMe',
        phoneNumber:'+996555535533',
        token: crypto.randomUUID(),
      },
      {
        username: 'admin',
        password: '5str0ngPswrd',
        displayName: 'Mr. Anderson',
        phoneNumber:'+996555133713',
        token: crypto.randomUUID(),
      },
    ]);

    const defaultUser = await User.findOne({ username: 'user' });
    const adminUser = await User.findOne({ username: 'admin' });

    await Category.create([
      {
        title: 'Cars'
      },{
        title: 'Computers'
      },{
        title: 'Pets'
      },{
        title: 'Home'
      },{
        title: 'Other'
      },
    ])

    const cars = await Category.findOne({ title: 'Cars' });
    const computers = await Category.findOne({ title: 'Computers' });
    const pets = await Category.findOne({ title: 'Pets' });
    const home = await Category.findOne({ title: 'Home' });
    const other = await Category.findOne({ title: 'Other' });

    await Listing.create([
      {
        title: 'Default Car Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 60000000,
        image:'/fixtures/brand-new-honda-fit.jpeg',
        categoryId: cars?._id,
        userId: defaultUser?._id
      },
      {
        title: 'Default Computer Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper eget duis at tellus at. Cursus euismod quis viverra nibh cras pulvinar mattis nunc.',
        price: 90000,
        image:'/fixtures/brand-new-pc.jpg',
        categoryId: computers?._id,
        userId: defaultUser?._id
      },
      {
        title: 'Default Pet Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse. Faucibus turpis in eu mi bibendum neque egestas. Convallis posuere morbi leo urna molestie at elementum eu facilisis.',
        price: 15200,
        image:'/fixtures/lab-pup.jpg',
        categoryId: pets?._id,
        userId: defaultUser?._id
      },
      {
        title: 'Default Home Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 100,
        image:'/fixtures/rug.jpg',
        categoryId: home?._id,
        userId: defaultUser?._id
      },
      {
        title: 'Default Other Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse. Faucibus turpis in eu mi bibendum neque egestas. Convallis posuere morbi leo urna molestie at elementum eu facilisis.',
        price: 1337,
        image:'/fixtures/empty-plastic-bottles.jpg',
        categoryId: other?._id,
        userId: defaultUser?._id
      },
      {
        title: 'Admin Car Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 132456789,
        image:'/fixtures/hilux.jpg',
        categoryId: cars?._id,
        userId: adminUser?._id
      },
      {
        title: 'Admin Computer Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper eget duis at tellus at. Cursus euismod quis viverra nibh cras pulvinar mattis nunc.',
        price: 31337,
        image:'/fixtures/admin-pc.jpg',
        categoryId: computers?._id,
        userId: adminUser?._id
      },
      {
        title: 'Admin Pet Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse. Faucibus turpis in eu mi bibendum neque egestas. Convallis posuere morbi leo urna molestie at elementum eu facilisis.',
        price: 20000,
        image:'/fixtures/corso-pup.jpeg',
        categoryId: pets?._id,
        userId: adminUser?._id
      },
      {
        title: 'Admin Home Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 50000,
        image:'/fixtures/smeg-fridge.jpeg',
        categoryId: home?._id,
        userId: adminUser?._id
      },
      {
        title: 'Admin Other Title',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse. Faucibus turpis in eu mi bibendum neque egestas. Convallis posuere morbi leo urna molestie at elementum eu facilisis.',
        price: 1337,
        image:'/fixtures/furniture.png',
        categoryId: other?._id,
        userId: adminUser?._id
      },
    ])

    await db.close();
  } catch (e) {
    console.log('Collection were missing, skipping drop');
  }
};

void run();
