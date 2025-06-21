import { Schema, model, Document, Types } from "mongoose";

// Interface for TypeScript
interface IImage extends Document {
  public_id?: string; // Cloudinary public_id
  url: string; // Cloudinary secure_url
  altText?: string;
  resource_type: "image" | "video";
  createdBy: Types.ObjectId; // User who uploaded
  associatedModel: {
    kind: "Restaurant" | "User" | "Review"; // Related models
    item: Types.ObjectId | null; // Reference ID
  };
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema<IImage>(
  {
    public_id: { type: String },
    url: { type: String, required: true },
    altText: { type: String, default: "" },
    // width: { type: Number, required: true },
    // height: { type: Number, required: true },
    // format: { type: String, required: true }, // 'jpg', 'png', etc.
    resource_type: {
      type: String,
      required: true,
      enum: ["image", "video"],
      default: "image",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    associatedModel: {
      kind: {
        type: String,
        required: true,
        enum: ["Restaurant", "User", "Review"],
      },
      item: {
        type: Schema.Types.ObjectId,      
        refPath: "associatedModel.kind",
        default: null,
      },
    },
  },
  { timestamps: true }
);

export const Image = model<IImage>("Image", ImageSchema);
