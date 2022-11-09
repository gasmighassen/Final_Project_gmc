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
    url: {
      type: String,
      required: true,
    },
    feedback: [
      {
        comment: { type: String },
      },
    ],
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceFiles", ServiceFilesSchema);
