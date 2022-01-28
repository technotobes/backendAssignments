const express = require('express')
const router = express.Router()

function authenticateMiddleware(req, res, next) {
    if(req.session) {
        if(req.session.username) {
            // send the user to their original request
            next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
}

// /movies
router.get('/', authenticateMiddleware, (req, res) => {
    const username = req.session.username
    let userMovies = movies.filter(movie => movie.username.toLowerCase() == username.toLowerCase())
    res.render('movies', {allMovies: userMovies})
})


router.get("/:movieId", (req, res) => {
    const movieId = parseInt(req.params.movieId)
    let movie = movies.find(movie => movie.movieId == movieId)
    res.render('id', {movieId: movie})
})

router.get('/genre/:genre', (req, res) => {
    const genre = req.params.genre
    const username = req.session.username
    let userMovies = movies.filter(movie => movie.username.toLowerCase() == username.toLowerCase())
    // console.log(genre)
    let filteredMovies = userMovies.filter(movie => movie.genre.toLowerCase() == genre.toLowerCase())
    res.render('genre', {movieGenre: filteredMovies})
})





router.post('/create-movie', authenticateMiddleware, (req, res) => {
    const title = req.body.movieTitle
    const description = req.body.movieDescription
    const genre = req.body.movieGenre
    const posterURL = req.body.moviePosterURL

    const username = req.session.username
    // console.log(username)

    const movie = {
        title:title, 
        description:description, 
        genre:genre, 
        posterURL:posterURL, 
        movieId: movies.length + 1,
        username: username
    }
    movies.push(movie)
    res.redirect('/movies')
})

router.post('/delete', (req, res) => {
    const movieId = req.body.movieId
    movies = movies.filter(movie => movie.movieId != movieId)
    res.redirect('/movies')
})


module.exports = router