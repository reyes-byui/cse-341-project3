const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Hello World']
    const result = await mongodb.getDatabase().db().collection('items').find();
    result.toArray().then((items) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);
    });
};

// get items by id
const getSingle = async (req, res) => {
    //#swagger.tags=['Hello World']
    const itemsId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('items').find({_id: itemsId});
    result.toArray().then((items) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items[0]);
    });
};

// create item
const createItem = async (req, res) => {
    //#swagger.tags=['Hello World']
    const item = {
        productType: req.body.productType,
        productBrand: req.body.productBrand,
        productName: req.body.productName,
        weightPerUnit: req.body.weightPerUnit,
        pricePerUnit: req.body.pricePerUnit,
	    sellingPrice: req.body.sellingPrice,
	    expirationDate: req.body.expirationDate,
    };
    const response = await mongodb.getDatabase().db().collection('items').insertOne(item);
    if(response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the item.');
    }
};

// update item
const updateItem = async (req, res) => {
    //#swagger.tags=['Hello World']
    const itemsId = new ObjectId(req.params.id);
    const item = {
        productType: req.body.productType,
        productBrand: req.body.productBrand,
        productName: req.body.productName,
        weightPerUnit: req.body.weightPerUnit,
        pricePerUnit: req.body.pricePerUnit,
	sellingPrice: req.body.sellingPrice,
	expirationDate: req.body.expirationDate,
    };
    const response = await mongodb.getDatabase().db().collection('items').replaceOne({_id: itemsId},item);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }  else {
        res.status(500).json(response.error || 'An error occured while updating item.');
    }
};

// delete item
const deleteItem = async (req, res) => {
    //#swagger.tags=['Hello World']
    const itemsId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('items').deleteOne({_id: itemsId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    }  else {
        res.status(500).json(response.error || 'An error occured while updating item.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createItem,
    updateItem,
    deleteItem
};
