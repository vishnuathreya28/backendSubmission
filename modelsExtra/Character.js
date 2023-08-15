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
    relation_name: {
      type: String,
      required: true
    },
    relation_type: {
      type: String,
      required: true
    },
    related_character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character'
    }
  }]
});

characterSchema.pre('save', async function(next) {
  for (const relation of this.char_relations) {
    if (relation.relation_name && relation.relation_type) {
      const relatedCharacter = await Character.findOne({
        char_name: relation.relation_name
      });
      if (relatedCharacter) {
        relation.related_character = relatedCharacter._id;
      }
    }
  }
  next();
});

const Character = mongoose.model('Character', characterSchema);

module.exports = { Character };
