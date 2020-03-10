'use strict';

const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(
        req.body.name,
        3,
        "O nome deve conter no minimo 3 caracteres"
    ); // Exemplo de uso de validação
    contract.isEmail(
        req.body.email,

        "E-mail inválido"
    );
    contract.hasMinLen(
        req.body.password,
        6,
        "A senha deve conter no minimo 3 caracteres"
    );

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res
            .status(400)
            .send(contract.errors())
            .end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: "Cliente cadastrado com sucesso!"
        });
    } catch (e) {
        res.status(500).send({ message: "Falha ao processar sua requisição" },
            console.log(e));
    }
exports.authenticate = async(req, res, next) => {

    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return
        }
        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({ message: "Falha ao processar sua requisição" },
            console.log(e));
    }
};
};