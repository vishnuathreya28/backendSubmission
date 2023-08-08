const { Relation } = require('../models/Relation');

// Controller function to create a new relation
async function createRelation(req, res) {
  try {
    const { name, description } = req.body;

    // Validate request data
    if (!name || !description) {
      return res.status(400).json({ message: 'Both "name" and "description" are required fields.' });
    }

    // Create a new Relation document
    const newRelation = new Relation({
      name,
      description
    });

    // Save the new Relation document to the database
    const savedRelation = await newRelation.save();

    // Respond with the saved Relation document
    res.status(201).json(savedRelation);
  } catch (error) {
    console.error('Error creating a new relation:', error);
    res.status(500).json({ message: 'An error occurred while creating the relation.' });
  }
}

// Controller function to get all relations
async function getRelations(req, res) {
  try {
    const relations = await Relation.find();
    res.json(relations);
  } catch (error) {
    console.error('Error getting relations:', error);
    res.status(500).json({ message: 'An error occurred while fetching relations.' });
  }
}

// Controller function to get a single relation by ID
async function getRelationById(req, res) {
  try {
    const relation = await Relation.findById(req.params.id);
    if (!relation) {
      return res.status(404).json({ message: 'Relation not found.' });
    }
    res.json(relation);
  } catch (error) {
    console.error('Error getting relation by ID:', error);
    res.status(500).json({ message: 'An error occurred while fetching the relation.' });
  }
}

// Controller function to update a relation by ID
async function updateRelation(req, res) {
  try {
    const { name, description } = req.body;

    // Validate request data
    if (!name || !description) {
      return res.status(400).json({ message: 'Both "name" and "description" are required fields.' });
    }

    // Find the relation by ID and update its properties
    const updatedRelation = await Relation.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
      },
      { new: true }
    );

    if (!updatedRelation) {
      return res.status(404).json({ message: 'Relation not found.' });
    }

    // Respond with the updated relation document
    res.json(updatedRelation);
  } catch (error) {
    console.error('Error updating relation by ID:', error);
    res.status(500).json({ message: 'An error occurred while updating the relation.' });
  }
}

// Controller function to delete a relation by ID
async function deleteRelation(req, res) {
  try {
    const deletedRelation = await Relation.findByIdAndDelete(req.params.id);
    if (!deletedRelation) {
      return res.status(404).json({ message: 'Relation not found.' });
    }
    res.json({ message: 'Relation deleted successfully.' });
  } catch (error) {
    console.error('Error deleting relation by ID:', error);
    res.status(500).json({ message: 'An error occurred while deleting the relation.' });
  }
}

module.exports = {
  createRelation,
  getRelations,
  getRelationById,
  updateRelation,
  deleteRelation,
};
