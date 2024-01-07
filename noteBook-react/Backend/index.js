const dbConnect = require('./db');
const express = require('express');
dbConnect();

const app = express();
const port = 8000;

app.get('/',(req,res)=>{
res.send("hello")
})


app.listen(port,()=>{
    console.log(`srever is listening on post ${port}`);
});