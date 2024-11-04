const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('cards').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};
  
const getCard = async (req, res) => {
    const cardId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('cards').find({ _id: cardId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};
  
const createCard = async (req, res) => {
    const card = {
        price: req.body.price,
        name: req.body.name,
        mana_cost: req.body.mana_cost,
        converted_mana: req.body.converted_mana
    };
    const response = await mongodb.getDb().db().collection('cards').insertOne(card);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the card.');
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
    const cardId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('cards').remove({ _id: cardId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the card.');
    }
};
  
module.exports = {
    getAll,
    getCard,
    createCard,
    updateCard,
    deleteCard  
};