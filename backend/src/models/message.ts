import { model, models, Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    sender: {
      type: String,
      required: true,
      enum: ['user', 'bot']
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

export const MessageModel = models.Message || model('Message', messageSchema);
