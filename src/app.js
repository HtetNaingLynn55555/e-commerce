require('dotenv').config()
let express = require('express')
let mongoose = require('mongoose');






let app = express();
let PORT = process.env.PORT;

// For request body upload
app.use(express.json());
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);


app.listen(`${PORT}`, console.log(`App is running at port ${PORT}`))
