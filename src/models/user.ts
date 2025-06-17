import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId; // Explicitly define _id
  email: string;
  password: string;
  role: 'sales_rep' | 'manager';
  createdAt: Date;
  updatedAt: Date;

  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['sales_rep', 'manager'], required: true },
    resetPasswordToken: { type: String }, 
    resetPasswordExpires: { type: Date },
    
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', UserSchema);