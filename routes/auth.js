const express = require('express');
const router = express.router();

router.get("/",(req,res) =>{
    res.send("Hello")
})

module.exports = router