const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProjectSchema = new schema(
  {
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
        required: true,
      },
    ],

    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    infoProject: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
