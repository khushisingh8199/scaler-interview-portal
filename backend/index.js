const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const CustomError = require('./CustomError')
const interviewroutes = require('./routes/interview')
const userroutes = require('./routes/user')

const dburl = 'mongodb+srv://e19cse170:khushi123@cluster0.hpd1y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dburl);
const db = mongoose.connection

db.on('error', console.error.bind(console , 'Connection Error'))
db.once('open' , () => console.log("Database Connected")) 

const app = express()
app.use(express.json())
app.use(cors({
    methods: ['POST', 'GET', 'PATCH', 'DELETE']
}))

app.use('/api/interview' , interviewroutes)
app.use('/api/user' , userroutes)

app.use('*',(req,res,next) => {
    const e = new CustomError('Request Not Found',404)
    return next(e)   
})

app.use((err,req,res,next) =>{
    let {message,statuscode}=err
    if(!message) message= 'Server Malfunction'
    if(!statuscode) statuscode=500
    return res.status(statuscode).json({message})
})

const port = 5000
app.listen(port , () => {
    console.log(`Listening on port ${port}`)
})





