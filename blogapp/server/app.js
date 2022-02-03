const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const app = express() 
const pgp = require('pg-promise')()
const models = require('./models')
const indexRoutes = require('./routes/index')
const blogRoutes = require('./routes/blogs')


// setting up Express to use Mustache Express as template pages 
app.engine('mustache', mustacheExpress())
// the pages are located in views directory
app.set('views', './views')
// extension will be .mustache
app.set('view engine', 'mustache')

app.use(session({
    secret: 'THISSECRETKEY',
    saveUninitialized: true,
    resave: true
}))

app.use(express.urlencoded())
app.use('/', indexRoutes)
app.use('/blog', blogRoutes)
app.use(express.static('static'))
const connectionString = 'postgres://luvefyai:EVb5Eg9whBVYkVsPEfXtEENoJfBfsdxT@castor.db.elephantsql.com/luvefyai'

const db = pgp(connectionString)


app.get('/', (req, res) => {
    res.render('index')
})




app.listen(3000, () => {
    console.log('Server is running...')
})