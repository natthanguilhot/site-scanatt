const express = require('express');
const router = express.Router();
const Attelle = require('../models/Attelle');


router.get('/' +
  '', (req, res, next) => {
  Attelle.find().then(
    (attelle) => {
      res.status(200).json(attelles);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

router.post('/', (req, res, next) => {
    const attelle = new Attelle({
        id: req.body.id,
        isPrinting: req.body.isPrinting,
        isFinished : req.body.isFinished,
        patient: req.body.patient,
        scan: req.body.scan,
        impression: req.body.impression,
        isDeleted: req.body.isDeleted,
        dateDeleted: req.body.dateDeleted,
        });
    attelle.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
});

router.put('/:id', (req, res, next) => {
    const attelle = new Attelle({
        id: req.body.id,
        isPrinting: req.body.isPrinting,
        isFinished : req.body.isFinished,
        patient: req.body.patient,
        scan: req.body.scan,
        impression: req.body.impression,
        isDeleted: req.body.isDeleted,
        dateDeleted: req.body.dateDeleted,
    });
    Attelle.updateOne({id: req.params.id}, attelle).then(
      () => {
        res.status(201).json({
          message: 'Attelle updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
});
module.exports = router;