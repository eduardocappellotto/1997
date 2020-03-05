"use strict";

exports.get = (req, res, next) => {
  Product.find({ active: true }, "title price slug") // Filtro do que é encontrado, mostrado
    .then(data => {
      res.status(201).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.getBySlug = (req, res, next) => {
  Product.findOne(
    { slug: req.params.slug, active: true },
    "title description price slug tags"
  ) // Filtro do que é encontrado, mostrado
    .then(data => {
      res.status(201).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.getById = (req, res, next) => {
  Product.findById(req.params.id) // Filtro por Id
    .then(data => {
      res.status(201).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.getByTag = (req, res, next) => {
  Product.find(
    {
      tags: req.params.tag, //filtro por tags
      active: true
    },
    "title description price slug tags"
  )
    .then(data => {
      res.status(201).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.post = (req, res, next) => {
  res.status(201).send(req.body);
  var product = new Product(req.body);
  product
    .save()
    .then(x => {
      res.status(201).send({ message: "Produto cadastrado com sucesso." });
    })
    .catch(e => {
      res
        .status(400)
        .send({ message: "Falha ao cadastrar o produto", data: e });
    });
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
