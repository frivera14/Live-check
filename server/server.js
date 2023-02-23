const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')
const path = require('path')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)


if (process.env.NODE_ENV === 'production') {
    app.use('/static', express.static(path.join(__dirname, '../client/build')));
  }
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`🌍 Now listening on localhost:${PORT}`)
    })
})