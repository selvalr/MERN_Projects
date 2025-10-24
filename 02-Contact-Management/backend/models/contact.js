import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  company: String,
  status: {
    type: String,
    enum: ["Intrested", "Follow-up", "Closed"],
    default: "Intrested",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Contact", contactSchema);
