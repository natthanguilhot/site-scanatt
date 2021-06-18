const Attelle = require('../models/Attelle');

exports.createAttelle = (req,res,next)=>{
    delete req.body._id;
    const attelle = new Attelle({
        ...req.body
    });
    attelle.save()
    .then(()=>res.status(201).json({ message :'Attelle enregistré' }))
    .catch(error=> res.status(400).json({ error }))
};

exports.modifyAttelle = (req,res,next)=>{
    Attelle.updateOne({ _id:req.params.id},{...req.body, _id:req.params.id})
    .then(()=>res.status(201).json({ message :'Attelle mis à jour !'}))
    .catch(error=> res.status(400).json({ error }))
};

exports.getAttelle = (req, res, next) => {
    Attelle.find()
    .then(attelles => res.status(200).json(attelles))
    .catch(error=> res.status(400).json({ error }))
};

exports.getOneAttelle = (req, res, next) => {
    Attelle.findOne({ _id: req.params.id })
      .then(attelle => res.status(200).json(attelle))
      .catch(error => res.status(404).json({ error }));
};

exports.deleteAllAttelle = (req,res,next)=>{
    Attelle.deleteMany()
    .then(()=>res.status(201).json({ message :'Toutes les attelles ont été supprimé !'}))
    .catch(error=> res.status(400).json({ error }))
};