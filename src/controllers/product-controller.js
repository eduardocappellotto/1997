"use strict";

exports.post = (req, res, next) => {
  res.status(201).send(req.body);
};

exports.put = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug
    }
  })
    .then(x => {
      res
        .status(200)
        .send({ message: "Produto atualizado com sucesso." });
    })
    .catch(e => {
      res
        .status(400)
        .send({ message: "Falha ao atualizar o produto", data: e });
    });
};

exports.delete = (req, res, next) => {
  res.status(200).send(req.body);
};
