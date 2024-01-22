const express=require('express');
const app=express()
// const appRoutes=require('./Routes/userRoutes')
// const fpRoute=require('./Routes/forgotPasswordRoute')
require('./Database/connection/connectDb')
const port=process.env.PORT || 5000;
const contactroute=require('./Routes/contactRoutes')
// app.use('/v1',appRoutes);
// app.use('/v1',fpRoute);
app.use('/v1',contactroute);
const start=()=>{
    app.listen(port,()=>{
        console.log("server is started");
        console.log("Click here: http://localhost:5000/v1");
    })
}
start();