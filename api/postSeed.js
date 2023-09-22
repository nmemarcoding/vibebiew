const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/user');
const Post = require('./models/post');


mongoose
    .connect("mongodb+srv://nmemarcoding:Nima1377@cluster0.va0yfxf.mongodb.net/")
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
})  .catch(err => console.log(err));

const seedPosts = async () => {
    try {
        // Get all users from the database
        const users = await User.find();

        // Create a post for each user using Faker.js
        const posts = users.map(user => ({
            desc: faker.lorem.paragraphs(3),
            image: faker.image.imageUrl(),
            userId: user._id
        }));

        // Insert the posts into the database
        await Post.insertMany(posts);

        console.log('Posts seeded successfully');
    } catch (err) {
        console.log(err);
    }

    mongoose.disconnect();
};

seedPosts();
