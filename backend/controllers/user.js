const DB = require('../db.config')
const User = DB.User

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(_err => res.status(500).json({ message: 'Erreur Interne' }))
}

exports.getUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.json(400).json({ message: 'Paramétre manquant' })
    }

    try {
        let user = await User.findOne({ where: { id: userId }, attributes: ['id', 'nom', 'prenom', 'pseudo', 'email'] })
        if (user === null) {
            return res.status(404).json({ message: 'Cet utilisateur n\'existe pas !' })
        }

        return res.json({ data: user })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur Interne' })
    }
}

exports.addUser = async (req, res) => {
    const { nom, prenom, pseudo, email, password, confirmPassword } = req.body

    if (!nom || !prenom || !pseudo || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Vous devez remplir tous les champs !' })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Les mots de passe doivent être identique !' })
    }

    try {
        const user = await User.findOne({ where: { email: email }, raw: true })
        if (user !== null) {
            return res.status(409).json({ message: `Cet utilisateur "${nom}" existe déjà !` })
        }

        const userPseudo = await User.findOne({ where: { pseudo: pseudo }, raw: true })
        if (userPseudo !== null) {
            return res.status(409).json({ message: `Ce pseudo "${pseudo}" est déjà utilisé !` })
        }

        let userc = await User.create(req.body)
        return res.status(201).json({ message: 'Utilisateur créé', data: userc })

    } catch (err) {
        res.status(500).json({ message: 'Erreur Interne' })
    }
}

exports.updateUser = async (req, res) => {
    let userId = parseInt(req.params.id)
    const { nom, prenom, pseudo, email } = req.body

    if (!userId) {
        return res.status(400).json({ message: 'Paramétre manquant' })
    }

    if (!nom || !prenom || !pseudo || !email) {
        return res.status(400).json({ message: 'Vous devez remplir tous les champs !' })
    }

    const userPseudo = await User.findOne({ where: { pseudo: pseudo }, raw: true })
    if (userPseudo !== null) {
        return res.status(409).json({ message: `Ce pseudo "${pseudo}" est déjà utilisé !` })
    }

    try {
        let user = await User.findOne({ where: { id: userId }, raw: true })
        if (user === null) {
            return res.status(404).json({ message: 'Cet utilisateur n\'existe pas !' })
        }

        await User.update(req.body, { where: { id: userId } })
        return res.json({ message: 'Utilisateur mis à jour' })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur Interne' })
    }
}

exports.untrashUser = (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.status(400).json({ message: 'Paramétre manquant' })
    }

    User.restore({ where: { id: userId } })
        .then(() => res.status(204).json({}))
        .catch(_err => res.status(500).json({ message: 'Erreur Interne' }))
}

exports.trashUser = (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.status(400).json({ message: 'Paramétre manquant' })
    }

    User.destroy({ where: { id: userId } })
        .then(() => res.status(204).json({}))
        .catch(_err => res.status(500).json({ message: 'Erreur Interne' }))
}

exports.deleteUser = (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.status(400).json({ message: 'Paramétre manquant' })
    }

    User.destroy({ where: { id: userId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(_err => res.status(500).json({ message: 'Erreur Interne' }))
}