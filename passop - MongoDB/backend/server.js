const express = require('express')
const app = express()
require('dotenv').config()
console.log(process.env.MONGO_URL) // remove this after you've confirmed it is working
const port = 3000
const bodyparser = require('body-parser')
app.use(bodyparser.json)

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';


client.connect();


app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);
  res.json(findResult)
})

app.post('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);
  res.json(findResult)
})

app.delete('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);
  res.json(findResult)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)

})