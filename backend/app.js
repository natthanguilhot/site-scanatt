const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const Attelle = require('./models/Attelle');

mongoose.connect('mongodb+srv://Natt:1234@cluster0.d4jo3.mongodb.net/Attelles?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/attelles', (req,res,next)=>{
    delete req.body._id;
    const attelle = new Attelle({
        ...req.body
    });
    attelle.save()
    .then(()=>res.status(201).json({ message :'Attelle enregistré' }))
    .catch(error=> res.status(400).json({ error }))
});

app.get('/api/attelles', (req, res, next) => {
    Attelle.find()
    .then(attelles => res.status(200).json(attelles))
    .catch(error=> res.status(400).json({ error }))
});

app.put('/api/attelles/:id', (req,res,next)=>{
    Attelle.updateOne({ _id:req.params.id},{...req.body, _id:req.params.id})
    .then(()=>res.status(201).json({ message :'Attelle mis à jour !'}))
    .catch(error=> res.status(400).json({ error }))
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.delete('/api/attelles', (req,res,next)=>{
    Attelle.deleteMany()
    .then(()=>res.status(201).json({ message :'Toutes les attelles ont été supprimé !'}))
    .catch(error=> res.status(400).json({ error }))
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = app;



// TODO : refact du code backend