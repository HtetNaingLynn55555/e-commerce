require('dotenv').config()
let express = require('express')
let mongoose = require('mongoose');

// migrator import
let {migrator} = require('./migration/migrator');

// Router import
let permissionRouter = require('./routers/Authorization/permission')
let roleRouter = require('./routers/Authorization/role')
let userRouter = require('./routers/user');



let app = express();
let PORT = process.env.PORT;

// For request body upload
app.use(express.json());
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);


// Router
app.use('/api/permissions', permissionRouter);
app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
// Error Handler

app.use((error, request, response, next)=>{
    response.status(500).json({
        conditon : false,
        message : error.message
    })
});

app.use("*", (request, response, next)=>{
    response.status(404).json({
        message : "under maintainence"
    })
})

migrator()

app.listen(`${PORT}`, console.log(`App is running at port ${PORT}`))
