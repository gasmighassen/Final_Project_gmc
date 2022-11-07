const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ServiceFilesSchema = new schema(
  {
    services: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
      required: true,
    },

    id_project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    files: [{ url: { type: String, required: true } }],
    feedback: [{ type: String, required: false }],
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceFiles", ServiceFilesSchema);
