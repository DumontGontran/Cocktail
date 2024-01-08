const express = require('express')
const cors = require('cors')

let DB = require('./db.config')

const app = express()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const user_router = require('./routes/users')
const cocktail_router = require('./routes/cocktails')

const auth_router = require('./routes/auth')

app.get('/', (req, res) => res.send(`Je suis en ligne. Tout est OK !`))

app.use('/users', user_router)
app.use('/cocktails', cocktail_router)

app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send('Qu\'est ce que tu essais de faire !?!'))

DB.sequelize.authenticate()
    .then(() => console.log('Connexion Database OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Ce serveur fonctionne sur le port ${process.env.SERVER_PORT} !`)
        })
    })
    .catch(err => console.log('Erreur Database', err))