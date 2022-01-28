const express = require('express')
const app = express() 
const mustacheExpress = require('mustache-express')
const session = require('express-session')
// const { use } = require('./routes/movies')
const moviesRouter = require('./routes/movies')

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

app.use(express.urlencoded())
app.use(session({
    secret: 'THISSECRETKEY',
    saveUninitialized: true,
    resave: true
}))
app.use('/movies', moviesRouter)
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')


app.use(express.static('static'))



global.movies = [
    {username: 'johndoe', movieId: 1, title: 'Batman', description: 'The Dark Knight kills Joker', genre:"Action", posterURL: "https://cdn-www.comingsoon.net/assets/uploads/gallery/the-batman/the-batman-poster-3.jpg"},
    {username: 'johndoe', movieId: 2, title: 'Spiderman', description: 'Spidey fucked up', genre:"Action", posterURL: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/snh_online_6072x9000_posed_01.jpg"},
    {username: 'marydoe', movieId: 3, title: 'Encanto', description: 'Hispanic girl ostracized for being useless', genre:"Musical", posterURL: "https://lumiere-a.akamaihd.net/v1/images/p_encanto_homeent_22359_4892ae1c.jpeg"}
]

let users = [
    {username:'johndoe', password:'password'},
    {username:'marydoe', password:'password'}
]

// Get and display register page
app.get('/register', (req, res) =>{
    res.render('register')
})

// Get and display login page
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })

    if(persistedUser) {
        if(req.session) {
            req.session.username = persistedUser.username
        }

        res.redirect('/movies')
    } else {

        res.render('login', {errorMessage: 'Username or password is invalid!'})   

    }

})

app.get('/logout', (req, res) =>{

    if(req.session) {
        req.session.destroy();
        res.redirect('/')
    }
})


//creates new user and pushes userobject into users array
app.post('/register', (req, res) =>{
    const username = req.body.usernameText
    const password = req.body.passwordText

    const newUser = {username:username, password:password}

    users.push(newUser)
    res.render('login', {createMessage:'Your account has been created! Please log in.'})
})

app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/api/movies', (req, res) => {
    res.json(movies)
})

app.listen(3000, () => {
    console.log('Server is running...')
})