const express = require('express')
const router = express.Router()






router.post('/add-trip', (req, res) => {
    const tripId = trips.length + 1
    const title = req.body.tripTitle
    const image = req.body.tripImage
    const dod = req.body.tripDod
    const dor = req.body.tripDor

    const trip = {tripId: tripId, title: title, image: image, dod: dod, dor: dor}
    trips.push(trip)
    res.redirect('/trips')

})

router.get('/trips/edit/:tripId', (req, res) => {
    const tripId = parseInt(req.params.tripId)
    // let trips = tasks.filter(trip => trip.tripId != tripId)
    let trip = trips.find(trip => trip.tripId == tripId)
    res.render('edit-trip', {editTrip: trip})
    console.log(trip)
})

router.get('/trips/delete/:tripId', (req, res) => {
    const tripId = parseInt(req.params.tripId)
    // let trip = trips.filter(trip => trip.tripId != tripId)
    let trip = trips.find(trip => trip.tripId == tripId)
    res.render('delete-trip', {deleteTrip: trip})
    console.log(trip)
})

router.post('/trips/delete/:tripId', (req, res) => {
    const tripId = parseInt(req.params.tripId)
    trips = trips.filter(trip => trip.tripId != tripId)
    res.redirect('/trips')
})

router.post('/trips/edit/:tripId', (req, res) => {
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


router.get('/trips', (req, res) => {
    res.render('trips', {allTrips: trips})
})

router.get('/add-trip', (req, res) => {
    res.render('add-trip')
})

// now other files can import router
module.exports = router