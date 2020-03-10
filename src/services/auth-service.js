'use strict';
const jwt = require('jsonwebtoken');

//Gera um token
exports.generateToken = async(data) => {
    var data = jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
    return data;
}


//Decodifica um token
exports.decodeToken = async(token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

//Autoriza uma rota
exports.authorize = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                })
            } else {
                next();
            }
        })
    }
}

//Checa se é admin ou user
exports.isAdmin = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Essa funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};