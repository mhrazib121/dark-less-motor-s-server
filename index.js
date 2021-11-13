const {MongoClient} = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port =  process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvulc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        const database = client.db("darklessMotors")
        const productsCillection = database.collection("products");

        // post API 
        // app.post('/products', async(req, res)=>{
        //     const product = req.body;
            
        //     const result = await productsCillection.insertOne(product);
        //     res.json(result);
        //     console.log('por',result)
        // })

        // Get Products api 
        app.get('/products', async(req, res)=>{
            const cursor = productsCillection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })

    }
    finally{

    }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Dark Less Motors server Side running')
})
app.listen(port, ()=>{
    console.log('server connected')
})

