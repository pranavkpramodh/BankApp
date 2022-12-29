// server creation

// 1)Import Express

const express = require('express')

// import dataservices
const dataservices = require('./services/data.service')

// import cors
const cors = require('cors');


// import jwt

const jwt = require('jsonwebtoken')


// 2)create a application using express

const app = express()

// Give command to share data via cors


// to parse json from request body
app.use(express.json())

app.use(cors({
    origin:'http://localhost:4200'
}))

// create a port number

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})

// Application specific middlewre
const appMiddleware = (req,res,next) => {
    console.log('Application specific middleware');
    next();

}
app.use(appMiddleware)


// Router specific middleware

const jwtMiddleware = (req,res,next) => {
try{
    console.log('router specific middleware');

    const token = req.headers['x-access-token']//eerre76thjskhujhsuz
    const data = jwt.verify(token,'superkey2020')
    console.log(data);
    next();
}catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:'please login first'

    })
}
}


// // 4) Resolving HTTP Request
// // get, post, put, patch, delete
// // Resolving Get Request

// app.get('/', (req,res) => {
//     res.send('get request');
// })

// // resolving post request

// app.post('/', (req,res) => {
//     res.send('post request');
// })

// // resolving put request

// app.put('/', (req,res) => {
//     res.send('put request');
// })

// // resolving patch request

// app.patch('/', (req,res) => {
//     res.send('patch request');
// })

// // resolving delete request

// app.delete('/', (req,res) => {
//     res.send('delete request');
// })




// API Request
// registration request
app.post('/registration',(req,res)=>{
    console.log(req.body);
    dataservices.registration(req.body.acno,req.body.username,req.body.password)//data
    .then(result=>{
    res.status(result.statusCode).json(result)
})
})


// login request
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataservices.login(req.body.acno,req.body.password)//data
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})



// deposit request
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.deposit(req.body.acno, req.body.password, req.body.amount)//data
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


// withdraw request
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.withdraw(req.body.acno, req.body.password, req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

// transaction request
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


// delete request
app.delete ('/deleteAcc/:acno',(req,res)=>{
    dataservices.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
