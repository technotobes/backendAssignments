const express = require('express')
const app = express() 
const mustacheExpress = require('mustache-express')
const moviesRouter = require('./routes/movies')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.urlencoded())
app.use('/movies', moviesRouter)

app.use(express.static('static'))



global.movies = [
    {movieId: 1, title: 'Batman', description: 'The Dark Knight kills Joker', genre:"Action", posterURL: "https://cdn-www.comingsoon.net/assets/uploads/gallery/the-batman/the-batman-poster-3.jpg"},
    {movieId: 2, title: 'Spiderman', description: 'Spidey fucked up', genre:"Action", posterURL: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/snh_online_6072x9000_posed_01.jpg"},
    {movieId: 3, title: 'Encanto', description: 'Hispanic girl ostracized for being useless', genre:"Musical", posterURL: "https://lumiere-a.akamaihd.net/v1/images/p_encanto_homeent_22359_4892ae1c.jpeg"}
]

app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/api/movies', (req, res) => {
    res.json(movies)
})

app.listen(3000, () => {
    console.log('Server is running...')
})