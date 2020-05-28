const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    status: {
      type: Boolean,
      default: 1,
    },
    code: String,
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: String,
    clicks: {
      type: Number,
      default: 0,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Url", urlSchema);
