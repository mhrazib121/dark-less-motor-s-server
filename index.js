const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvulc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("darklessMotors")
        const productsCollection = database.collection("products");
        const ordersCollection = database.collection("orders");
        const reviewsCollection = database.collection("reviews");

            // Get Products api 
            app.get('/products', async (req, res) => {
                const cursor = productsCollection.find({});
                const products = await cursor.toArray();
                res.send(products);
            })

            // Product order API
            app.post('/orders', async (req, res)=>{
                const placeOrder = req.body;
                const result = await ordersCollection.insertOne(placeOrder);
                res.json(result);
            })

            // Product order get
            app.get('/orders', async(req, res)=>{
                const cursor = ordersCollection.find({});
                const orders = await cursor.toArray();
                res.send(orders);
            })

            // Calcel Order
            app.delete('/orders/:id', async (req, res)=>{
                const id = req.params.id;
                const query = {_id: ObjectId(id)};
                const result = await ordersCollection.deleteOne(query);
                res.json(result);
            })

            //Review post 
            app.post('/reviews', async (req, res)=>{
                const reviewProvide = req.body;
                const result = await reviewsCollection.insertOne(reviewProvide);
                res.json(result)
            })

            //Review get
            app.get('/reviews', async (req, res)=>{
                const cursor = reviewsCollection.find({});
                const reviews = await cursor.toArray();
                res.send(reviews);
            })

    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Dark Less Motors server Side running')
})
app.listen(port, () => {
    console.log('server connected')
})

