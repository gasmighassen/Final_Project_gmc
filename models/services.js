const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ServiceSchema = new schema(
  {
    serviceType: { type: String, required: true },
    id_project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Services", ServiceSchema);
