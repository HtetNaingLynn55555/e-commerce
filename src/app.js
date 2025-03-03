require('dotenv').config()
let express = require('express')
let mongoose = require('mongoose');

// Router import
let permissionRouter = require('./routers/Authorization/permission')




let app = express();
let PORT = process.env.PORT;

// For request body upload
app.use(express.json());
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);


// Router
app.use('/api/permissions', permissionRouter);

app.listen(`${PORT}`, console.log(`App is running at port ${PORT}`))
