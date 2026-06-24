import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

import connectDB from './config/db.js'

import Restaurant from './models/restaurant.js'
import Food from './models/food.js'

await connectDB()

async function seedData(){

    try{

        // RESTAURANTS

        console.log('Creating restaurants...')

        const r1 = await Restaurant.create({
            name: "Burger Kingdom",
            picture: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
        })

        const r2 = await Restaurant.create({
            name: "Pizza Paradise",
            picture: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
        })

        const r3 = await Restaurant.create({
            name: "Desi Tandoor",
            picture: "https://images.unsplash.com/photo-1585937421612-70a008356fbe"
        })

        const r4 = await Restaurant.create({
            name: "Spice Route",
            picture: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        })

        const r5 = await Restaurant.create({
            name: "Wrap City",
            picture: "https://images.unsplash.com/photo-1520072959219-c595dc870360"
        })

        console.log('Restaurants created successfully')

        // FOODS

        console.log('Creating food items...')

        await Food.insertMany([

            // BURGER KINGDOM

            {
                name: "Veg Burger",
                price: 120,
                isVeg: true,
                restaurant: r1._id,
                picture: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
            },

            {
                name: "Chicken Burger",
                price: 180,
                isVeg: false,
                restaurant: r1._id,
                picture: "https://images.unsplash.com/photo-1550547660-d9450f859349"
            },

            {
                name: "Cheese Burger",
                price: 160,
                isVeg: true,
                restaurant: r1._id,
                picture: "https://images.unsplash.com/photo-1550317138-10000687a72b"
            },

            {
                name: "French Fries",
                price: 90,
                isVeg: true,
                restaurant: r1._id,
                picture: "https://images.unsplash.com/photo-1576107232684-1279f390859f"
            },

            {
                name: "Cold Coffee",
                price: 110,
                isVeg: true,
                restaurant: r1._id,
                picture: "https://images.unsplash.com/photo-1517701604599-bb29b565090c"
            },

            // PIZZA PARADISE

            {
                name: "Veg Burger",
                price: 130,
                isVeg: true,
                restaurant: r2._id,
                picture: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
            },

            {
                name: "Chicken Burger",
                price: 210,
                isVeg: false,
                restaurant: r2._id,
                picture: "https://images.unsplash.com/photo-1550547660-d9450f859349"
            },

            {
                name: "Double Chicken Burger",
                price: 260,
                isVeg: false,
                restaurant: r2._id,
                picture: "https://images.unsplash.com/photo-1550317138-10000687a72b"
            },

            {
                name: "Farmhouse Pizza",
                price: 340,
                isVeg: true,
                restaurant: r2._id,
                picture: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
            },

            {
                name: "Pepsi",
                price: 60,
                isVeg: true,
                restaurant: r2._id,
                picture: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e"
            },

            // DESI TANDOOR

            {
                name: "Aloo Burger",
                price: 100,
                isVeg: true,
                restaurant: r3._id,
                picture: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
            },

            {
                name: "Chicken Burger",
                price: 170,
                isVeg: false,
                restaurant: r3._id,
                picture: "https://images.unsplash.com/photo-1550547660-d9450f859349"
            },

            {
                name: "Spicy Chicken Burger",
                price: 230,
                isVeg: false,
                restaurant: r3._id,
                picture: "https://images.unsplash.com/photo-1550317138-10000687a72b"
            },

            {
                name: "Paneer Tikka",
                price: 260,
                isVeg: true,
                restaurant: r3._id,
                picture: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"
            },

            {
                name: "Butter Chicken",
                price: 320,
                isVeg: false,
                restaurant: r3._id,
                picture: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
            },

            // SPICE ROUTE

            {
                name: "Mushroom Burger",
                price: 150,
                isVeg: true,
                restaurant: r4._id,
                picture: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
            },

            {
                name: "Chicken Burger Deluxe",
                price: 240,
                isVeg: false,
                restaurant: r4._id,
                picture: "https://images.unsplash.com/photo-1550547660-d9450f859349"
            },

            {
                name: "Loaded Burger",
                price: 280,
                isVeg: false,
                restaurant: r4._id,
                picture: "https://images.unsplash.com/photo-1550317138-10000687a72b"
            },

            {
                name: "Veg Biryani",
                price: 220,
                isVeg: true,
                restaurant: r4._id,
                picture: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0"
            },

            {
                name: "Chicken Biryani",
                price: 340,
                isVeg: false,
                restaurant: r4._id,
                picture: "https://images.unsplash.com/photo-1563379091339-03246963d96c"
            },

            // WRAP CITY

            {
                name: "Veg Burger Supreme",
                price: 140,
                isVeg: true,
                restaurant: r5._id,
                picture: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
            },

            {
                name: "Chicken Burger Supreme",
                price: 220,
                isVeg: false,
                restaurant: r5._id,
                picture: "https://images.unsplash.com/photo-1550547660-d9450f859349"
            },

            {
                name: "Crispy Chicken Burger",
                price: 250,
                isVeg: false,
                restaurant: r5._id,
                picture: "https://images.unsplash.com/photo-1550317138-10000687a72b"
            },

            {
                name: "Chicken Wrap",
                price: 180,
                isVeg: false,
                restaurant: r5._id,
                picture: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783"
            },

            {
                name: "Paneer Wrap",
                price: 160,
                isVeg: true,
                restaurant: r5._id,
                picture: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38"
            }
        ])

        console.log('Food items inserted successfully')

        console.log('Database seeded successfully')

        process.exit(0)

    }catch(error){

        console.log('Error while seeding database:', error)

        process.exit(1)
    }
}

seedData()