const express = require('express');
const router = express.Router();
// const { authenticateToken } = require('../middleware/authentication');
const { createRelation, getRelations, getRelationById, updateRelation, deleteRelation } = require('../controllers/relationController');

// Create a new relation
router.post('/', createRelation);

// Get all relations
router.get('/', getRelations);

// Get a single relation by ID
router.get('/:id', getRelationById);

// Update a relation by ID
router.put('/:id', updateRelation);

// Delete a relation by ID
router.delete('/:id', deleteRelation);

module.exports = router;
