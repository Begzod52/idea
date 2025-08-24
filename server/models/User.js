import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

userSchema.methods.toJSONSafe = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    createdAt: this.createdAt
  };
};

export default mongoose.model('User', userSchema);
