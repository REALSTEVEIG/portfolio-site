require('dotenv').config()
const path = require('path')
const express = require('express')

const connectDB = require('./db/connect')

const server = express()

const submitRouter = require('./route/submit')

server.set('view engine', 'pug');
server.set('views', path.join(__dirname, 'views'))

server.use(express.static('./public'))


server.use(express.json())

server.use('/submit', submitRouter)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()