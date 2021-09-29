import mongoose from "mongoose";

const ActiveUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    day: { type: Date, expires: 1000 * 60 * 60 * 24, default: Date.now },
  },
  //   week: { type: Date, expires: 1000 * 60 * 60 * 24 * 7, default: Date.now },
  // },
  // month: { type: Date, expires: 1000 * 60 * 60 * 24* 30, default: Date.now },
  // },

  // { createdAt: { type: Date, expires: "2m" } },
  { timestamps: true }
);

export default mongoose.models.ActiveUser ||
  mongoose.model("ActiveUser", ActiveUserSchema);
