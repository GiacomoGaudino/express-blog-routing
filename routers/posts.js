const express = require('express')
const router = express.Router()

const posts = [
    {
        id: 1,
        titolo: 'Ciambellone',
        contenuto: 'Un classico dolce da colazione soffice e profumato. Perfetto da gustare con un cappuccino o una tazza di tè.',
        immagine: '/images/ciambellone.jpeg',
        tags: ['dolce', 'colazione', 'ciambellone']
    },
    {
        id: 2,
        titolo: 'Cracker alla barbabietola',
        contenuto: 'Cracker croccanti e colorati a base di barbabietola, ideali come snack salutare o per accompagnare hummus e formaggi.',
        immagine: '/images/cracker_barbabietola.jpeg',
        tags: ['snack', 'barbabietola', 'salutare']
    },
    {
        id: 3,
        titolo: 'Pane fritto dolce',
        contenuto: 'Delizioso pane dolce fritto, morbido dentro e dorato fuori, da servire con miele, marmellata o zucchero a velo.',
        immagine: '/images/pane_fritto_dolce.jpeg',
        tags: ['dolce', 'pane', 'fritto']
    },
    {
        id: 4,
        titolo: 'Pasta con barbabietola',
        contenuto: 'Pasta cremosa con barbabietola, ricotta e noci: un piatto elegante e sano, dal colore vivace e dal sapore delicato.',
        immagine: '/images/pasta_barbabietola.jpeg',
        tags: ['pasta', 'barbabietola', 'vegetariano']
    },
    {
        id: 5,
        titolo: 'Torta paesana',
        contenuto: 'Torta rustica tipica della tradizione, ricca di frutta secca, cioccolato e spezie, perfetta per le feste o una merenda speciale.',
        immagine: '/images/torta_paesana.jpeg',
        tags: ['dolce', 'tradizione', 'rustica']
    }
];


//home
router.get('/', (req, res) => {
    res.send('Welcome to the posts server')
})

//index
router.get('/', (req, res) => {
    res.json(posts)
})

//show (S)
router.get('/:id', (req, res) => {
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
})

//create
router.post('/', (req, res) => {
    res.send('Create a new post')
})

//update
router.put('/:id', (req, res) => {
    const { id } = req.params
    res.send(`Update the entire post with ID: ${id}`)
})

//modify
router.patch('/:id', (req, res) => {
    const { id } = req.params
    res.send(`Partial update of the post with ID: ${id}`)
})

//destroy
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const postsLenght = posts.length
    const newPosts = posts.filter(item => item.id !== id)

    if (newPosts.length === postsLenght) {
        return res.status(404).json({
            error: true,
            message: 'Post not found'
        })
    }

    res.send(newPosts)
})



module.exports = router