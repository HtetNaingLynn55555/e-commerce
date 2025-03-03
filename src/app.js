require('dotenv').config()
let express = require('express')



let app = express();
let PORT = process.env.PORT;
app.listen(`${PORT}`, console.log(`App is running at port ${PORT}`))
