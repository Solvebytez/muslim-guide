import mongoose, { Document, Schema } from "mongoose";

export interface IBlacklistToken extends Document {
  token: string;
  createdAt: Date;
}

const BlacklistTokenSchema: Schema = new Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 } // 24 hours
});

export const BlacklistToken = mongoose.model<IBlacklistToken>("BlacklistToken", BlacklistTokenSchema);