const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ServiceFilesSchema = new schema(
  {
    services: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
      required: false,
    },

    id_project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false,
    },
    files: [{ url: String }],
    feedback: [String],
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceFiles", ServiceFilesSchema);
