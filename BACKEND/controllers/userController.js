const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = 10;
const secreyKey = 'appPhonebook';

// Creo el controlador de Usuario
exports.crear = async( req, res) => {
    try {
        const { email, password } = req.body;
        // Hasheamos el password
        const passwordHash = await bcrypt.hash(password, salt);
        const userNew = new userModel({
           email, password: passwordHash
        });
        await userNew.save();
        res.status(201).json({id: userNew._id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.autenticar = async( req, res) => {
    try {
        const { email, password } = req.body;
        // Buscamos el usuarioo en la db
        const user = await userModel.findOne({email})

        if( !user){
            res.status(401).json({ msg: 'El usuario no existe' });
        }

        // Comparamos el password
        const passValido = await bcrypt.compare(password, user.password);
        if( !passValido){
            res.status(401).json({ msg: 'Credenciales invalidas' });
        }
        // Generamos el JWT
        const token = jwt.sign({userId: user._id}, secreyKey, {expiresIn: '1h'});

        res.status(201).json({msg: 'Autenticación exitosa', token: token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
