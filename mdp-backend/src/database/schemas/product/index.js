const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  product_cod: {
    type: String,
    required: true,
    index: { unique: true },
  },
  name: { type: String, required: true },
  product_desc: { type: String, required: true },
  category: {
    type: schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  created_at: { type: Date, default: Date.now, required: false },
  updated_at: { type: Date, default: Date.now, required: false },
});

module.exports = mongoose.model("Product", productSchema);
