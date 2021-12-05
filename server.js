const express = require('express');
const mongoose = require('mongoose');
const Cards = require("./dbCards");
const Cors = require('cors')

//app config
const app = express();

//middleware
app.use(express.json())
app.use(Cors())

//DB config
const dbURI = 'mongodb+srv://rapoo:rapoo151@cluster0.yydtd.mongodb.net/tinderdb?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(8001))
    .catch((err) => console.log(err))

//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send("HELLO THIS IS RAPOO TESTING!!!");
})
app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});