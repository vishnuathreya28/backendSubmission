const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Create a new character
router.post('/', characterController.createCharacter);

// Get all characters
router.get('/', characterController.getCharacters);

// Get a character by ID
router.get('/:id', characterController.getCharacterById);

// Update a character by ID
router.put('/:id', characterController.updateCharacter);

// Delete a character by ID
router.delete('/:id', characterController.deleteCharacter);

// Generate character reports in PDF format
router.get('/reports/pdf', characterController.generatePDFReport);

// Generate character reports in Excel format
router.get('/reports/excel', characterController.generateExcelReport);

// Generate character reports in CSV format
router.get('/reports/csv', characterController.generateCSVReport);
  
module.exports = router;
