const mongoose = require('mongoose');

const { Schema } = mongoose;

const collectibleSchema = new Schema({
  category: String, id: Number, name: String, icon_uri: String,
}, { _id: false });

const userSchema = new Schema({
  name: String,
  collectibles: [collectibleSchema],
});

userSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema, 'users');
