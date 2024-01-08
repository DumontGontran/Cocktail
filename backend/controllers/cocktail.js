const DB = require('../db.config')
const Cocktail = DB.Cocktail
const User = DB.User

exports.getAllCocktails = (req, res) => {
    Cocktail.findAll({paranoid: false})
        .then(cocktails => res.json({ data: cocktails }))
        .catch(_err => res.status(500).json({ message: 'Erreur interne' }))
}

exports.getCocktail = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    if (!cocktailId) {
        return res.json(400).json({ message: 'Paramétre manquant' })
    }

    try {
        let cocktail = await Cocktail.findOne({ where: { id: cocktailId }, include: {model: User, attributes:['id','pseudo','email']} })

        if (cocktail === null) {
            return res.status(404).json({ message: 'Ce cocktail n\'existe pas !' })
        }

        return res.json({ data: cocktail })
    } catch (err) {
        return res.status(500).json({ message: 'Erreur interne' })
    }
}

exports.addCocktail = async (req, res) => {
    const { user_id, nom, description, recette } = req.body

    if (!user_id || !nom || !description || !recette) {
        return res.status(400).json({ message: 'Vous devez remplir tous les champs !' })
    }

    try{
        let cocktail = await Cocktail.findOne({ where: { nom: nom }, raw: true })
        if (cocktail !== null) {
            return res.status(409).json({ message: `Le cocktail "${nom}" existe déjà !` })
        }

        cocktail = await Cocktail.create(req.body)
        return res.json({ message: 'Cocktail Créé', data: cocktail })
    }catch(err){
        return res.status(500).json({ message: 'Erreur interne' })
    }
}

exports.updateCocktail = async (req, res) => {
    let cocktailId = parseInt(req.params.id)
    const { nom, description, recette } = req.body

    if (!cocktailId) {
        return res.status(400).json({ message: 'Paramétre manquant' })
    }

    if (!nom || !description || !recette) {
        return res.status(400).json({ message: 'Vous devez remplir tous les champs !' })
    }

    try{
        let cocktail = await Cocktail.findOne({ where: { id: cocktailId }, raw: true })
        if (cocktail === null) {
            return res.status(404).json({ message: 'Ce cocktail n\'existe pas !' })
        }

        await Cocktail.update(req.body, { where: { id: cocktailId } })
        return res.json({ message: 'Cocktail mis à jour' })
    }catch(err){
        return res.status(500).json({ message: 'Erreur interne' })
    }    
}

exports.untrashCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    if (!cocktailId) {
        return res.status(400).json({ message: 'Paramétre manquant' })
    }

    Cocktail.restore({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(_err => res.status(500).json({ message: 'Erreur interne' }))
}

exports.trashCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    if (!cocktailId) {
        return res.status(400).json({ message: 'Paramétre manquant' })
    }

    Cocktail.destroy({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(_err => res.status(500).json({ message: 'Erreur interne' }))
}

exports.deleteCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    if (!cocktailId) {
        return res.status(400).json({ message: 'Paramétre manquant' })
    }

    Cocktail.destroy({ where: { id: cocktailId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(_err => res.status(500).json({ message: 'Erreur interne' }))
}