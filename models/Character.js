const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  char_name: {
    type: String,
    required: true
  },
  char_age: {
    type: Number,
    required: true
  },
	char_photo: {
    type: Array,
    required: true
  },
  char_gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  char_occupation: {
    type: String,
    required: true
  },
  char_relations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Relation'
  }],
  char_properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }]
});

const Character = mongoose.model('Character', characterSchema);

module.exports = {Character};