import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import { db, connectToDB } from './db.js';

const app = express();

app.use(express.json());
app.use(cors());
const PORT =  8000;

connectToDB(() => {
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  });
  

app.get('/', (req, res) => {
    res.send("Server Running Successfully ✅");
});

app.get('/hello', (req, res) => {
    res.status(200).send('OK');
});