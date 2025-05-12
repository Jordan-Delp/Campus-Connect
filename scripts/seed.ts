import 'dotenv/config';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Listing from '@/models/Listing';
import User from '@/models/User';

async function seed() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear old data
    await Listing.deleteMany({});
    await User.deleteMany({});

    console.log('🧹 Cleared existing listings and users');

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@campusconnect.com',
      password: 'password123', // Unhashed for demo purposes 
    });

    console.log('Created demo user:', demoUser.email);

    // Create demo listings
    const demoListings = [
      {
        title: 'MacBook Pro 13"',
        description: 'Lightly used M1 MacBook Pro. Great for coding and school.',
        price: 900,
        category: 'Electronics',
        imageUrl: '/demo/macbook.jpg',
        location: 'UGA Campus',
        userId: demoUser._id,
      },
      {
        title: 'Calculus Textbook',
        description: 'Required textbook for MATH 2250. Good condition.',
        price: 40,
        category: 'Books',
        imageUrl: '/demo/calculus.jpg',
        location: 'Library Dropbox',
        userId: demoUser._id,
      },
      {
        title: 'Mini Fridge',
        description: 'Dorm-sized fridge, runs well. Pickup only.',
        price: 60,
        category: 'Furniture',
        imageUrl: '/demo/fridge.jpg',
        location: 'Brumby Hall',
        userId: demoUser._id,
      },
    ];

    await Listing.insertMany(demoListings);
    console.log('Inserted demo listings');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
