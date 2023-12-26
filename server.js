
const express = require('express')
const path = require('path')

const { error } = require('console');
const e = require('express');
const app = express()
const api = require('./server/routes/api')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)



const port = 3000
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})