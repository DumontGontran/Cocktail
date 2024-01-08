const jwt = require('jsonwebtoken')

const DB = require('../db.config')
const User = DB.User

exports.login = async (req, res) => {
    const { email, password } = req.body

    if(!email){
        return res.status(400).json({ message: 'Email incorrecte'})
    }

    try{
        let user = await User.findOne({ where: {email: email}, raw: true})
        if(user === null){
            return res.status(400).json({ message: 'Ce compte n\'existe pas !'})
        }
 
        let test = await User.checkPassword(password, user.password)
        if(!test){
            return res.status(400).json({ message: 'Mot de passe incorrecte'})
        }

        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})
        
        return res.json({access_token: token})
    }catch(err){
        res.status(500).json({ message: 'Tentative de connexion échouée', error: err})        
    }
}