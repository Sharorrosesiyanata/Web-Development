
import mongoose from 'mongoose';

const AdviceSchema = new mongoose.Schema({
  name: String,
  tip: String,
}, { timestamps: true });

export default mongoose.models.Advice || mongoose.model('Advice', AdviceSchema);
