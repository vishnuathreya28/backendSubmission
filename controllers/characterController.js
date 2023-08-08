const { Character } = require('../models/Character');

// Controller function to create a new character
async function createCharacter(req, res) {
  try {
    const { name, age, photos, gender, occupation } = req.body;

    // Validate request data
    if (!name || !age || !photos || !gender || !occupation) {
      return res.status(400).json({ message: 'All fields (name, age, photos, gender, occupation) are required.' });
    }

    // Create a new Character document
    const newCharacter = new Character({
      name,
      age,
      photos,
      gender,
      occupation,
    });

    // Save the new Character document to the database
    const savedCharacter = await newCharacter.save();

    // Respond with the saved Character document
    res.status(201).json(savedCharacter);
  } catch (error) {
    console.error('Error creating a new character:', error);
    res.status(500).json({ message: 'An error occurred while creating the character.' });
  }
}
async function getCharacters(req, res) {
    try {
      const characters = await Character.find();
      console.log('Retrieved characters:', characters);
      res.json(characters);
    } catch (error) {
      console.error('Error getting characters:', error);
      res.status(500).json({ message: 'An error occurred while fetching characters.' });
    }
  }

// Controller function to get a single character by ID
async function getCharacterById(req, res) {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found.' });
    }
    res.json(character);
  } catch (error) {
    console.error('Error getting character by ID:', error);
    res.status(500).json({ message: 'An error occurred while fetching the character.' });
  }
}

// Controller function to update a character by ID
async function updateCharacter(req, res) {
  try {
    const { name, age, photos, gender, occupation } = req.body;

    // Validate request data
    if (!name || !age || !photos || !gender || !occupation) {
      return res.status(400).json({ message: 'All fields (name, age, photos, gender, occupation) are required.' });
    }

    // Find the character by ID and update its properties
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        photos,
        gender,
        occupation,
      },
      { new: true }
    );

    if (!updatedCharacter) {
      return res.status(404).json({ message: 'Character not found.' });
    }

    // Respond with the updated character document
    res.json(updatedCharacter);
  } catch (error) {
    console.error('Error updating character by ID:', error);
    res.status(500).json({ message: 'An error occurred while updating the character.' });
  }
}

// Controller function to delete a character by ID
async function deleteCharacter(req, res) {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) {
      return res.status(404).json({ message: 'Character not found.' });
    }
    res.json({ message: 'Character deleted successfully.' });
  } catch (error) {
    console.error('Error deleting character by ID:', error);
    res.status(500).json({ message: 'An error occurred while deleting the character.' });
  }
}

module.exports = {
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};
