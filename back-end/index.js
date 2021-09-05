const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const { urlencoded } = require('express')

const app = express()
const PORT = process.env.PORT || 5000
//middleware
app.use(cors())
app.use(express.json())
// app.use(express, urlencoded())

app.get('/', (req, res) => {
  res.send("Test")
})

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
