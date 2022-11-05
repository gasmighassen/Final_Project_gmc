const mongoose = require("mongoose");
const schema = mongoose.Schema;

const DocumentSchema = new schema(
  {
    docs: { type: String, required: true },
    titre: { type: String, required: true },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Document", DocumentSchema);
