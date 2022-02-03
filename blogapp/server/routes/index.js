const express = require('express')
const router = express.Router()
const models = require('../models')
const bcrypt = require('bcrypt')
const SALT_ROUND = 10

router.get('/logout', (req, res) =>{

    if(req.session) {
        req.session.destroy();
        res.render('index', {logoutMessage:'Logged Out!'})
    }
})

router.post('/login', async (req,res) => {
    const username = req.body.usernameText
    const password = req.body.passwordText

    let user = await models.User.findOne({
        where: {
            username: username
        }
    })

    if(user!=null) {
        bcrypt.compare(password, user.password, (error,result) => {
            if(result) {
                if(req.session) {
                    req.session.user = {userId: user.id}
                    req.session.userId = user.id
                    req.session.username = user.username
                
                    res.redirect('/blog/dashboard')
                }
            } else {
                res.render('/', {errorMessage: 'Incorrect Password'})
            }
        })
    } else {
        res.render('/', {errorMessage: 'Username invalid'})
    }
})

router.get('/create-account', (req, res) => {
    res.render('create-account')
})

router.post('/create-account', async (req, res) => {
    const username = req.body.usernameText
    const password = req.body.passwordText

    let persistedUser = await models.User.findOne({
        where: {
            username:username
        }
    })

    if(persistedUser == null) {

        bcrypt.hash(password, SALT_ROUND, async (error, hash) => {
            if(error) {
                res.render('create-account', {errorMessage:'Error creating user'})
            } else {
                let user = models.User.build({
                    username:username,
                    password:hash
                })

                let savedUser = await user.save()
                if(savedUser != null) {
                    res.redirect('/')
                } else {
                    res.render('create-account', {errorMessage:"Username Already Exists!"})
                }
            }
        })

    } else {
        res.render('create-account', {errorMessage:"Username Already Exists!"})
    }

})

module.exports = router