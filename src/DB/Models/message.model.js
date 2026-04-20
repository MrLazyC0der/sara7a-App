import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, "Message content is required"],
            trim: true,
            minLength: [2, "Message content must be at least 2 characters"],
            maxLength: [500, "Message content must be at most 500 characters"],
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Receiver is required"],
        },
    },
    { timestamps: true }
);


export const MessageModel = mongoose.model("Message", messageSchema);