const express = require('express')
const app = express()
const PORT = 3000
const postRouter = require('./routers/posts')

app.use(express.static('public'))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

app.use('/', postRouter)

