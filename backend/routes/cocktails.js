const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const cocktailCtrl = require('../controllers/cocktail')

let router = express.Router()

router.use( (req, res, next) => {
    const event = new Date()
    console.log('Cocktail Time:', event.toString())
    next()
})

router.get('', cocktailCtrl.getAllCocktails)

router.get('/:id', cocktailCtrl.getCocktail)

router.put('', checkTokenMiddleware, cocktailCtrl.addCocktail)

router.patch('/:id', checkTokenMiddleware, cocktailCtrl.updateCocktail)

router.post('/untrash/:id', checkTokenMiddleware, cocktailCtrl.untrashCocktail)
    
router.delete('/trash/:id', checkTokenMiddleware, cocktailCtrl.trashCocktail)

router.delete('/:id', checkTokenMiddleware, cocktailCtrl.deleteCocktail)

module.exports = router