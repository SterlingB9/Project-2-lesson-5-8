const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { body, validationResult } = require('express-validator')

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('cards').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};
  
const getCard = async (req, res) => {
    try {
        const name = req.params.name;
        const result = await mongodb.getDb().db().collection('cards').find({ name: name }).toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching card:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  
const createCard = async (req, res) => {
    const card = {
        price: req.body.price,
        name: req.body.name,
        mana_cost: req.body.mana_cost,
        converted_mana: req.body.converted_mana
    };
    try {
        throw new Error
        const response = await mongodb.getDb().db().collection('cards').insertOne(card);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the card.');
        }
    } catch {
        res.status(404).json({ message: "Error connecting to database" })
    }
};
  
const updateCard = async (req, res) => {
    const cardId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const card = {
        price: req.body.price,
        name: req.body.name,
        mana_cost: req.body.mana_cost,
        converted_mana: req.body.converted_mana
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('cards')
        .replaceOne({ _id: cardId }, card);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the card.');
    }
};
  
const deleteCard = async (req, res) => {
    const name = req.params.name;
    const response = await mongodb.getDb().db().collection('cards').deleteOne({ name: name }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the card.');
    }
};

const validateManaCost = () => {
    return [
        body('mana_cost').isLength({ max: 8 })
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: 'mana_cost string length must be less than 8'
    })
  }
  
module.exports = {
    getAll,
    getCard,
    createCard,
    updateCard,
    deleteCard,
    validateManaCost,
    validate
};