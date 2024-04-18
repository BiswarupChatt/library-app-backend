require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors =  require('cors')

const configureDB = require('./config/db')

const {userRegisterValidationSchema} = require('./app/validations/user-validations')


const userCtrl = require('./app/controllers/user-ctrl')
const { checkSchema } = require('express-validator')



const app = express()
const port = 3334

configureDB()
app.use(express.json())
app.use(morgan('common'))
app.use(cors())

app.post('/users/register', checkSchema(userRegisterValidationSchema), userCtrl.register)



app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
