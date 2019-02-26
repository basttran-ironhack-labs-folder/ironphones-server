const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const phoneSchema = new Schema(
  {
    phoneModel: { type: String, required: true, minlength: 2 },
    brand: { type: String, required: true, minlength: 1 },
    price: { type: Number, required: true, min: 1 },
    image: { type: String, required: true, match: /^https?:\/\// },
    specs: { type: String }
  },
  {
    timestamps: true
  }
);

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;
