const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

app.use(express.urlencoded())
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')


let trips = [
    {tripId: 1, title:"Japan", image:"url", dod: '2022-02-17', dor: '2022-02-27'},
    {tripId: 2, title:"Europe", image:"url", dod: '2022-05-17', dor: '2022-05-19'}
]

app.post('/add-trip', (req, res) => {
    const tripId = trips.length + 1
    const title = req.body.tripTitle
    const image = req.body.tripImage
    const dod = req.body.tripDod
    const dor = req.body.tripDor

    const trip = {tripId: tripId, title: title, image: image, dod: dod, dor: dor}
    trips.push(trip)
    res.redirect('/trips')

})

app.get('/trips/edit/:tripId', (req, res) => {
    const tripId = parseInt(req.params.tripId)
    // let trips = tasks.filter(trip => trip.tripId != tripId)
    let trip = trips.find(trip => trip.tripId == tripId)
    res.render('edit-trip', {editTrip: trip})
    console.log(trip)
})

app.get('/trips/delete/:tripId', (req, res) => {
    const tripId = parseInt(req.params.tripId)
    // let trip = trips.filter(trip => trip.tripId != tripId)
    let trip = trips.find(trip => trip.tripId == tripId)
    res.render('delete-trip', {deleteTrip: trip})
    console.log(trip)
})

app.post('/trips/delete/:tripId', (req, res) => {
    const tripId = parseInt(req.params.tripId)
    trips = trips.filter(trip => trip.tripId != tripId)
    res.redirect('/trips')
})

app.post('/trips/edit/:tripId', (req, res) => {
    const tripId = parseInt(req.params.tripId)
    const updatedTitle = req.body.updatedTripTitle 
    const updatedImage = req.body.updatedTripImage
    const updatedDod = req.body.updatedTripDod
    const updatedDor = req.body.updatedTripDor

    // find the movie object, which has the same taskId
    let trip = trips.find(trip => trip.tripId == tripId)
    trip.title = updatedTitle
    trip.image = updatedImage
    trip.dod = updatedDod
    trip.dor = updatedDor

    res.redirect('/trips')
})


app.get('/trips', (req, res) => {
    res.render('trips', {allTrips: trips})
})

app.get('/add-trip', (req, res) => {
    res.render('add-trip')
})


app.listen(3000, () => {
    console.log('Server is running...')
})