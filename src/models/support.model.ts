import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from './user.model';


interface ISupport extends Document {
  subject: string;
  description: string;
  user: Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
  status: 'open' | 'in-progress' | 'resolved';
}

const supportSchema = new Schema<ISupport>(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: [100, 'Subject cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved'],
      default: 'open',
    },
  },
  { timestamps: true }
);

const Support = model<ISupport>('Support', supportSchema);

export default Support;