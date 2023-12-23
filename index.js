const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const productRouter = require('./routes/products')
const port = 3000;
const cors = require('cors') 
const app = express()


dotenv.config()
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("db connected"))
.catch((err) => console.log(err))

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(cors());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use('/api/products', productRouter)
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))

// app.get('/', (req, res) => res.send("Hello World!"))