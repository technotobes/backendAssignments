const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const tripsRouter = require('./routes')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.urlencoded())

// if the url/request start with trips
app.use('/trips', tripsRouter)

// everything inside the css folder is available at root level
app.use('/version-1', express.static('css'))
////// localhost:3000/version-1/styles.css

global.trips = [
    {tripId: 1, title:"Japan", image:"url", dod: '2022-02-17', dor: '2022-02-27'},
    {tripId: 2, title:"Europe", image:"url", dod: '2022-05-17', dor: '2022-05-19'}
]


app.get ('/', (req, res) => {


})



app.get('/users', (req, res) => {
    res.send('SHOW USER PROFILE')
})

app.get('/users/profile', (req, res) => {
    res.send('SHOW USER PROFILE')
})




app.listen(3000, () => {
    console.log('Server is running...')
})