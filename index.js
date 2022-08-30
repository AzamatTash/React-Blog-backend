import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.mozteuu.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB err', err))

const app = express();

app.use(express.json());
app.use(cors());

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Server ok');
});