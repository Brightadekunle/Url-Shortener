const express = require('express')
const router = express.Router()

const Link = require('../models/link')

// function checkLink(link){
//     Link.findOne({ shortUrl: link })
//         .then(result => {
//             if (result){
//                 return checkLink(link)
//             }
//         })
// }

router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/add-link', (req, res, next) => {
    Link.find()
        .then(links => {
            res.render('link_added', { links })
        })
        .catch(err => console.log(err)) 
    
})

router.post('/add-link', (req, res, next) => {
    const url = req.body.original_url
    
    const newLink = new Link({
        originalUrl: url,
    })
    newLink.shortUrl = newLink.generateLink()

    Link.findOne({ shortUrl: newLink.shortUrl  })
        .then(result => {
            if (!result){
                newLink.save()
                    .then(savedLink => {
                        console.log(savedLink)
                        res.redirect('/add-link')
                    })
                    .catch(err => console.log(err))
            } else{
                // Add an alternative if the short url alredy exist in the database
            }
        })  
})

router.get('/redirect/:short_url', (req, res, next) => {

    Link.findOne({ shortUrl: req.params.short_url })
        .then(url => {
            if (!url){
                res.send('Link does not exist!.')
            }
            res.redirect(url.originalUrl)
        })
})




module.exports = router