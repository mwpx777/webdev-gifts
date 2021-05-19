// SEEDS

const db = require('./connection');
const {User, Product, Category} = require('../models');

db.once('open', async () => {
    await Category.deleteMany();
    
    const categories = await Category.insertMany([
        {name: 'Apparel'},
        {name: 'Headwear'},
        {name: 'Drinkware'},
        {name: 'Accessories'}

    ]);

    console.log('Categories Seeded!');

    await Product.deleteMany();

    const products = await Product.insertMany([
        {
            name: "WebDev 2020-2021 tshirt",
            description: "Official WebDev 2020-2021 Tshirt.  Celebrate your triumph in completing the WebDev course, and pay tribute to your fallen classmates that did not finish!",
            image: "tshirt.png",
            category: categories[0]._id,
            price: 24.99
        },
        {
            name: "WebDev 2020-2021 hat",
            description: "Sweet flat brim baseball hat with the official WebDev Logo!  Looks even better when worn backwards!",
            image:"baseball-hat.png",
            category: categories[1]._id,
            price: 24.99
        },
        {
            name: "WebDev 2020-2021 tank",
            description: "Live like Adam 'Suns Out, Guns Out' Ramos! This tank might not help you get the ladies, but it will keep you cool while searching for a job!",
            image: "tank.png",
            category: categories[0]._id,
            price: 19.99
        },
        {
            name: "WebDev Covid Mask",
            description: "Want to show off your webdev skills while still being socially responsible?  This mask has you covered!",
            image:"mask.png",
            category: categories[3]._id,
            price: 9.99
        },
        {
            name: "WebDev pint glass",
            description: "Celebrate your completion of the webdev course by killing the brain cells that held your newfound knowledge!",
            image:"glass.png",
            category: categories[2]._id,
            price: 9.99
        },
        {
            name: "WebDev water bottle",
            description: "Look like you care about the earth while sipping your favorite beverage in style!",
            image:"bottle.png",
            category: categories[2]._id,
            price: 19.99
        },
        {
            name: "WebDev coffee mug",
            description: "Be the envy of the office with while sipping coffee from this sweet mug!",
            image:"coffee.png",
            category: categories[2]._id,
            price: 9.99
        },
        {
            name: "WebDev sticker",
            description: "Slap this on your car to help forget about the fact you are too poor to afford a Tesla!",
            image:"sticker.png",
            category: categories[3]._id,
            price: 1.99
        },
        {
            name: "WebDev beanie",
            description: "Perfect for wearing when rolling through Compton or on a cold winter's day.",
            image:"beanie.png",
            category: categories[1]._id,
            price: 10.99
        },
      
    ]);

    console.log("Products Seeded!");

    await User.deleteMany();

    await User.create({
        firstName: 'Pamela',
        lastName: 'Washington',
        email: 'pamela@testmail.com',
        password: 'password12345',
        orders: [
          {
            products: [products[0]._id, products[0]._id, products[1]._id]
          }
        ]
      });
    
      await User.create({
        firstName: 'Elijah',
        lastName: 'Holt',
        email: 'eholt@testmail.com',
        password: 'password12345'
      });
    
      console.log('users seeded');

    process.exit();
})