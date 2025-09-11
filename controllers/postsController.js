let posts = require('../data/posts.js')

function home(req, res) {
    res.send('Welcome to the posts server')
}

function index(req, res) {
    let filterPosts = posts
    const { tags } = req.query;
    if (req.query.tags) {
        filterPosts = filterPosts.filter(post => post.tags.includes(req.query.tags))
    }
    res.json(filterPosts)
}

function show(req, res) {
    const { id } = req.params
    const post = posts.find(item => item.id === parseInt(id))

    if (!post) {
        return res.status(404).json(
            {
                error: true,
                message: 'Post not found'
            })
    }

    res.json(post)
}

function store(req, res) {
    const { titolo, contenuto, immagine, tags } = req.body
    const newPost = {
        id: Math.max(...posts.map(post => post.id)) + 1,
        titolo: titolo,
        contenuto: contenuto,
        immagine: immagine,
        tags: tags
    }
    posts.push(newPost)
    res.send(posts)
}

function update(req, res) {
    const { id } = req.params
    let post = posts.find(item => item.id === parseInt(id))
    let { titolo, contenuto, immagine, tags } = req.body || {}

    if (!post) {
        return res.status(404).json(
            {
                error: true,
                message: 'Post not found'
            })
    }
    post.contenuto = contenuto
    post.titolo = titolo
    post.immagine = immagine
    post.tags = tags

    res.json(post)
}

function modify(req, res) {
    const { id } = req.params
    const keyChanger = (post, value, keyName) => {
        if (value !== undefined) {
            post[keyName] = value
        }
    }
    let post = posts.find(item => item.id === parseInt(id))
    let { titolo, contenuto, immagine, tags } = req.body || {}

    if (!post) {
        return res.status(404).json(
            {
                error: true,
                message: 'Post not found'
            })
    }
    keyChanger(post, titolo, 'titolo')
    keyChanger(post, contenuto, 'contenuto')
    keyChanger(post, immagine, 'immagine')
    keyChanger(post, tags, 'tags')

    res.json(post)
}

function destroy(req, res) {
    const id = parseInt(req.params.id)
    const postsLenght = posts.length
    posts = posts.filter(item => item.id !== id)

    if (posts.length === postsLenght) {
        return res.status(404).json({
            error: true,
            message: 'Post not found'
        })
    }

    res.send(posts)
}

module.exports = { home, index, show, store, update, modify, destroy }