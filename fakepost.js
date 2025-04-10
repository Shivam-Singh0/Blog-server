import mongoose from 'mongoose';
import connectDB from './db.js';
import Blog from './models/Blog.js';

const { ObjectId } = mongoose.Types;

function getRandomContent() {
  const content = [
    "This is a sample post about web development.",
    "Exploring MongoDB with Mongoose.",
    "React hooks make things easier!",
    "Server-side rendering with Next.js is powerful.",
    "Just another day learning backend development.",
    "This post is about building RESTful APIs.",
    "Debugging code can be both fun and frustrating.",
    "Testing your code is as important as writing it.",
    "Don't forget to commit often!",
    "Learning by doing is the best approach."
  ];
  return content[Math.floor(Math.random() * content.length)];
}

function generatePosts(count = 100) {
  const authors = [
    new ObjectId("67f794a21538a53cd59195f6"),
    new ObjectId("67f797191538a53cd59195fe"),
    new ObjectId("67f7e1e1d561ee046596e820"),
  ];

  const posts = [];

  for (let i = 0; i < count; i++) {
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 100000000));
    const updatedAt = new Date(createdAt.getTime() + Math.floor(Math.random() * 100000));

    posts.push({
      title: `Sample Post ${i + 1}`,
      content: getRandomContent(),
      author: authors[Math.floor(Math.random() * authors.length)],
      createdAt,
      updatedAt,
    });
  }

  return posts;
}

async function seedDB() {
  try {
    await connectDB();
    const samplePosts = generatePosts(90);
    await Blog.insertMany(samplePosts);
    console.log("✅ 100 sample blog posts inserted.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seedDB();
