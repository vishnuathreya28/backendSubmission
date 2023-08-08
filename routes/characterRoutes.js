const express = require('express');
const router = express.Router();
// const { authenticateToken } = require('../middleware/authentication');
const { createCharacter, getCharacters, getCharacterById, updateCharacter, deleteCharacter } = require('../controllers/characterController');

// Create a new character
router.post('/', createCharacter);

// Get all characters
router.get('/', getCharacters);

// Get a single character by ID
router.get('/:id', getCharacterById);

// Update a character by ID
router.put('/:id', updateCharacter);

// Delete a character by ID
router.delete('/:id', deleteCharacter);

module.exports = router;
