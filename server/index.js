const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./route/UserRoute');
const app = express();

require("dotenv").config({ path: "config/config.env" })

//MiddleWares
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_KEY)
    .then(() => console.log('mongoDB running'))
    .catch((err) => console.log(err))


app.use('/', userRouter);

app.listen(process.env.PORT, () => {
    console.log('App listening on port ' + process.env.PORT);
})