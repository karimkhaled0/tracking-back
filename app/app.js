import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import { config } from './config/dev'
import { json, urlencoded } from 'body-parser'
import userRouter from './src/user/user.router'
import { signin, signup, protect } from './utils/auth'
import taskRouter from './src/task/task.router'
import categoryRouter from './src/category/category.router';

// app setup
const app = express();
const PORT = process.env.PORT || 8000;


//body-parser setup
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))


//routes
app.get('/', (req, res) => {
    res.send("Hello")
})

app.post('/signup', signup)
app.post('/signin', signin)
app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/task', taskRouter)
app.use('/api/category', categoryRouter)



mongoose.connect(config.secrets.dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongodb is connected!!")
        app.listen(PORT, () => {
            console.log(` server is runing on port ${PORT}`)
        })
    })
    .catch((e) => console.log(e))
