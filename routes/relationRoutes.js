const express = require('express');
const router = express.Router();
const relationController = require('../controllers/relationController');

// Create a new relation
router.post('/', relationController.createRelation);

// Get all relations
router.get('/', relationController.getRelations);

// Get a relation by ID
router.get('/:id', relationController.getRelationById);

// Update a relation by ID
router.put('/:id', relationController.updateRelation);

// Delete a relation by ID
router.delete('/:id', relationController.deleteRelation);

module.exports = router;
