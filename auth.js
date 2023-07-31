const express = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('./models/Users-model');
const { generarJWT } = require('./helpers/jwt');

const createUser = async (req, res = express.response) => {

    const { email, password } = req.body

    try {




        let user = await Usuario.findOne({ email: email })

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'el usuario ya existe'
            });
        }

        user = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        await user.save();

const token = await generarJWT(user.id,user.name)


        

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el admin2'
        })
    }
}


const loginUser = async (req, res = express.response) => {

    const { email, password } = req.body;

    try {
        const user = await Usuario.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'el usuario no existe'
            });
        }


        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            });
        }



        const token = await generarJWT(user.id,user.name)




        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token


        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el admin'
        })

    }
}

const renewToken = async(req, res = express.response) => {

    const uid = req.uid
    const name = req.name


    const token = await generarJWT(uid,name)


    res.json({

        ok: true,
     token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}