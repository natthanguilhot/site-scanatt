const express = require('express');
const router = express.Router();

const attelleCtrl = require('../controllers/attelle');
const auth = require('../middleware/auth');

// POST
router.post('/', auth, attelleCtrl.createAttelle);

// GET
router.get('/', auth, attelleCtrl.getAttelle);

// GET ONE
router.get('/:id', auth, attelleCtrl.getOneAttelle);   

// PUT
router.put('/:id', auth, attelleCtrl.modifyAttelle);

// DELETE
router.delete('/', auth, attelleCtrl.deleteAllAttelle);


module.exports = router;