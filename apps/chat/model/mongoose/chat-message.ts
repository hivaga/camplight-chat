import mongoose from 'mongoose';


export interface IChatMessage {
  sender: string;
  time: number;
  message: string;
}

// Define a Schema
const chatMessageSchema = new mongoose.Schema<IChatMessage>({
  sender: {type: String, required: true},
  time: {type: Number, required: true},
  message: {type: String, required: true},
});

// Compile model from schema
export const ChatMessage = mongoose.models.ChatMessage ?? mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);
