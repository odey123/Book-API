const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    let user = new User ({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10) 
    })

user = await user.save();


if (!user){
    return res.status(500).json({message: 'This user could not be crated'})
}

     return res.status(201).json({message: 'User created succefully!'})
})
router.post('/login', async (req, res) => {
    const secret = process.env.secret;
    try{
        const user = await User.findOne({email: req.body.email })

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        if(!req.body.password) {
            return res.status(200).json({message: "Password is required "});
        }

        const passwordMatch = bcrypt.compareSync(req.body.password, user.passwordHash);
        if(!passwordMatch) {
            return res.status(404).json ({message: "Incorrect password"})
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            secret,
            {expiresIn : '2d'}
        )
        res.status(400).send({user: user.email, token})
    } catch (error) {
        return res.status(500).json({message: 'Server errror', error})
    }
});

module.exports = router;