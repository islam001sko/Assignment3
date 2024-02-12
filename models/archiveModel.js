const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archiveSchema = new Schema({
  accessedAt: { type: Date, default: Date.now },
  articles: [{
    headline: String,
    snippet: String,
    web_url: String,
    pub_date: Date
  }]
});

const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;
