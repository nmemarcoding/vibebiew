const express = require('express');
const{mongoose} = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to DB


mongoose
    .connect("mongodb+srv://nmemarcoding:Nima1377@cluster0.va0yfxf.mongodb.net/")
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
})

app.use('/api/auth', require('./routes/auth'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);