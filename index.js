const express = require('express');
const app = express();


const port = 3000;
app.use(express.json());

app.use('/',express.static('public'))

app.get('/',(req,res) => {
   
})

app.listen(port, () => {
    console.log("Listening Successfully!")
})