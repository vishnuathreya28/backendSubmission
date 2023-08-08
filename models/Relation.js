const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
    relation_name: {
      type: String,
      required: true
    },
    relation_description: {
      type: String,
      required: true
    },
    relation_id: {
      type: String,
      required: true
    }
  });

const Relation = mongoose.model('Relation', relationSchema);

module.exports = {Relation};