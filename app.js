const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('./models/user')

const {MONGOURL} = require("./keys")

mongoose.connect(MONGOURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
})

mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB");
})
mongoose.connection.on('error',(error)=>{
    console.log("Error connecting to MongoDB ",error);
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})