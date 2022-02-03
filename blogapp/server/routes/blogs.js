const express = require('express')
const router = express.Router()
const models = require('../models')
const { Op } = require('sequelize')

function authenticateMiddleware(req, res, next) {
    if(req.session) {
        if(req.session.user) {
            // send the user to their original request
            next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
}


router.get('/dashboard', authenticateMiddleware, (req, res) => {
    const userId = req.session.userId
    models.Post.findAll({
        where: {
            user_id: userId
        },
        include: [
            {
                model: models.User,
                as: "user"
            }
        ]
    })
    .then((posts) => {
        res.render('dashboard',{allPosts:posts})
    })
})


router.get('/view-all', (req, res) => {
    models.Post.findAll({
        include: [
            {
                model: models.User,
                as: "user"
            }
        ]
    })
    .then((posts) => {
        res.render('view-all', {allPosts:posts})
    })
})


router.get('/post/:postId', (req, res) => {
    const postId = parseInt(req.params.postId)
    console.log(postId)
    models.Post.findByPk(postId, {
        include: [
            {
                model: models.Comment,
                as: "comments",
                include:[{
                    model:models.User,
                    as: "commenter"
                }]
            },
            {
                model: models.User,
                as: "user"
            }
        ]
    })
    .then((post) => {
        console.log(post.dataValues)
        res.render('view-post', post.dataValues)
    })
    
})


router.get('/edit/:postId', (req, res) => {
    const postId = req.params.postId
    models.Post.findByPk(postId)
    .then((post) => {
        console.log(post)
        res.render('edit', {fullPost: post})
    })
})


router.post('/update/:postId', (req, res) => {
    const title = req.body.titleText
    const body = req.body.bodyText
    const category = req.body.categoryText
    const postId = req.params.postId
    models.Post.update({
        title: title,
        body: body,
        category: category
    }, {
        where: {
            id: postId
        }
    }).then(() => {
        res.redirect('/blog/dashboard') 
    })
})



router.post('/create-post', (req, res) => {
    
    const username = req.session.username
    const userId = req.session.userId
    const title = req.body.titleText
    const body = req.body.bodyText
    const category = req.body.categoryText

    const post = models.Post.build({
        title: title,
        body: body,
        category: category,
        user_id: userId
    })
    post.save().then(() => {
        console.log(username)
        res.redirect('/blog/dashboard')
    })

})

router.post('/create-comment', (req, res) => {

    const body = req.body.commentText
    const userId = req.session.userId
    const postId = req.body.postId

    const comment = models.Comment.build({
        body: body,
        user_id: userId,
        post_id: postId
    })
    comment.save().then(() => {
        res.redirect(`/blog/post/${postId}`)
    })

    
})


router.post('/delete/:postId', (req, res) => {
    const postId = req.params.postId
    models.Post.destroy({
        where: {
            id : postId
        }
    }).then(() => {
        res.redirect('/blog/dashboard')
    })
})

router.post('/delete/comment/:commentId', (req, res) => {
    const commentId = req.params.commentId
    const postId = req.body.postId
    models.Comment.destroy({
        where: {
            id : commentId
        }
    }).then(() => {
        res.redirect(`/blog/post/${postId}`)
    })
})

router.get('/post/category/:category', (req, res) => {
    const category = req.params.category

    models.Post.findAll({
        where: {
            category: {
                [Op.iLike]: category
            }
        }
    }).then((posts) => {
        res.render('dashboard', {allPosts: posts})
    })
})



module.exports = router