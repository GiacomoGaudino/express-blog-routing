const express = require('express')
const router = express.Router()
let posts = require('../data/posts.js')
const postsController = require('../controllers/postsController.js')

//home
router.get('/', postsController.home)

//index
router.get('/api/posts/', postsController.index)

//show (S)
router.get('/api/posts/:id', postsController.show)

//create
router.post('/api/posts/', postsController.store)

//update
router.put('/api/posts/:id', postsController.update)

//modify
router.patch('/api/posts/:id', postsController.modify)

//destroy
router.delete('/api/posts/:id', postsController.destroy)


module.exports = router