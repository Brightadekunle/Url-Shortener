const express = require('express')
const router = express.Router()

const indexController = require('../controllers/index')


router.get('/', indexController.indexGet)

router.get('/add-link/:id', indexController.addLinkGet)

router.post('/add-link', indexController.addLinkPost)

router.get('/stats', indexController.getStats)

router.get('/:shortUrl', indexController.getShortUrl)


module.exports = router