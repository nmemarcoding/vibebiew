const mongoose = require('mongoose');
const User = require('./models/User');
const faker = require('faker');

mongoose
    .connect("mongodb+srv://nmemarcoding:Nima1377@cluster0.va0yfxf.mongodb.net/")
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
})

const seedUsers = async () => {
    try {
       
        const users = [];

        for (let i = 0; i < 50; i++) {
            const user = new User({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                phone: faker.phone.phoneNumber(),
            });

            users.push(user);
        }

        await User.insertMany(users); // Insert the new users

        console.log('Seed complete!');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUsers();

