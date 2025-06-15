import mongoose, {Schema, Types, Document} from "mongoose";


export interface IDeals extends Document {
   title: string;
  stage: 'Prospecting' | 'Qualification' | 'Negotiation' | 'Closed';
  value: number;
  userId: Types.ObjectId;
  createdAt: Date;
}


const dealSchema: Schema =  new Schema (  {
    title: { type: String, required: true },
    stage: {
      type: String,
      enum: ['Prospecting', 'Qualification', 'Negotiation', 'Closed'],
      required: true,
    },
    value: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)


export default mongoose.model<IDeals>('Deal', dealSchema)



























