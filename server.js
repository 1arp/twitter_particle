const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT ||8080


app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(express.static(path.join(__dirname,'public')))

app.use('/api',require('./routes/api/index'))


app.listen(PORT,()=>console.log(`port started at ${PORT}`))