const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()


const dbURI = "mongodb://127.0.0.1:27017/Link"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

// Bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// View engine
app.set('view engine', 'ejs')


const indexRoutes = require('./routes/index')

app.use('/', indexRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`listening on PORT ${PORT}`))