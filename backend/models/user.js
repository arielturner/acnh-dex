const mongoose = require('mongoose');

const { Schema } = mongoose;

const collectibleSchema = new Schema({
  category: String, id: Number, name: String, icon_uri: String,
}, { _id: false });

const userSchema = new Schema({
  name: String,
  collectibles: [collectibleSchema],
});

// Add a unique, case-insensitive index for user name.
userSchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 1 } });

module.exports = mongoose.model('User', userSchema, 'users');
