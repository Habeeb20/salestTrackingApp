import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId; 
  email: string;
  password: string;
  role: 'client' | 'event planner';
  createdAt: Date;
  updatedAt: Date;
  uniqueNumber:string,
  isBlacklisted:boolean
  isVerified:boolean
  verificationToken?: string,
  
  verificationTokenExpiresAt?: Date,
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isFeatured: boolean
}

const UserSchema: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'event planner'], required: true },
    resetPasswordToken: { type: String }, 
    resetPasswordExpires: { type: Date },
      uniqueNumber: { type: String, unique: true },
  
    verificationToken: String,
    verificationTokenExpiresAt: Date,
 
    isBlacklisted: {
      type: Boolean,
      default: false, 
    },
    isVerified: {
      type: Boolean,
      default: false, 
    },
    isFeatured: {
      type: Boolean,
      default: false, 
    },
    
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', UserSchema);