import express from 'express';

const app = express();

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Server ok');
});