const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema({
  category_cod: {
    type: String,
    required: true,
    index: { unique: true },
  },
  category_desc: { type: String, required: true },
  category_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now, required: false },
  updated_at: { type: Date, default: Date.now, required: false },
});

module.exports = mongoose.model("Category", categorySchema);
