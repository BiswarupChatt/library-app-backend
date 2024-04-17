require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors =  require('cors')

const configureDB = require('./config/db')

const {userRegisterValidationSchema} = require('./app/validations/user-validations')

const app = express()
const port = 3334

configureDB()
app.use(express.json())
app.use(morgan('common'))
app.use(cors())





app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
