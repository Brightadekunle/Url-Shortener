const Link = require('../models/link')

const indexGet = (req, res, next) => {
    res.render('index')
}

const addLinkGet = (req, res, next) => {
    let id = req.params.id
    id = id.split(':')[1]
    Link.findOne({ _id: id })
        .then(link => {
            res.render('link_added.ejs', { link: link })
        })
        .catch(err => console.log(err))
    
}

const addLinkPost = (req, res, next) => {
    const url = req.body.original_url
    
    const newLink = new Link({
        originalUrl: url,
    })
    newLink.shortUrl = newLink.generateLink()

    Link.findOne({ originalUrl: newLink.originalUrl  })
        .then(result => {
            if (!result){
                newLink.save()
                    .then(savedLink => {
                        res.redirect(`/add-link/:${savedLink._id}`)
                    })
                    .catch(err => console.log(err))
            } else{
                // Add an alternative if the short url alredy exist in the database
                res.send('URL already exist in the database')
                
            }
        })  
}

const getStats = (req, res, next) => {
    Link.find()
        .then(links => {
            res.render('stats', { links })
        })
        .catch(err => console.log(err))
}

const getShortUrl = (req, res, next) => {
    let shortUrl = req.params.shortUrl
    Link.findOne({ shortUrl: shortUrl })
        .then(url => {
            const link = url.originalUrl
            return res.redirect(link)
        })
        .catch(err => console.log(`err- ${err}`))
}



module.exports = {
    indexGet,
    addLinkGet,
    addLinkPost,
    getStats,
    getShortUrl
}