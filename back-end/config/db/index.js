const { MongoClient } = require('mongodb');
const { connection } = require('mongoose');
const uri = "mongodb+srv://tich-hop:admin@cluster0.9vllm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
    console.log(connection);
});