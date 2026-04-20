import { create, find, findById } from "../../DB/database.repository.js";
import { MessageModel } from "../../DB/Models/message.model.js";
import { UserModel } from "../../DB/Models/user.model.js";
import { NotFoundError } from "../../Utils/Errors/error.helpers.js";
import { successResponse } from "../../Utils/Res/index.js";



export const sendMessage = async (req, res, next) => {
    const { receiverId } = req.params;
    const { content } = req.body;

    const userReceiver = await findById({
        model: UserModel,
        id: receiverId,
    });
    if (!userReceiver) {
        return next(new NotFoundError("Receiver not found"));
    }
    const message = await create({
        model: MessageModel,
        document: {
            content,
            receiver: userReceiver._id,

        },
    });
    return successResponse({ res, message, statusCode: 201 });
}
//getMessages
export const getMessagesById = async (req, res, next) => {
    const { messageId } = req.params;
    const message = await findById({
        model: MessageModel,
        id: messageId,
        select: "content sender receiver createdAt",
        options: {
            populate: [
                {
                    path: "receiver",
                    select: "firstName lastName -_id ",
                },
            ],
        },
    });
    if (!message) {
        return next(new NotFoundError("Message not found"));
    }
    return successResponse({ res, message, statusCode: 200 });
}
// getAllMessagesByAdmin

export const getAllMessagesByAdmin = async (req, res, next) => {
    const { receiverId } = req.params;

    let messages;

    if (receiverId) {
        messages = await find({
            model: MessageModel,
            filter: { receiver: receiverId }, // ✅ correct param name is `filter` not `query`
            select: "content sender receiver createdAt",
            options: {
                populate: [
                    {
                        path: "receiver",
                        select: "firstName lastName -_id",
                    },
                ],
            },
        });
    } else {
        messages = await find({
            model: MessageModel,
            select: "content sender receiver createdAt",
            options: {
                populate: [
                    {
                        path: "receiver",
                        select: "firstName lastName -_id",
                    },
                ],
            },
        });
    }

    if (!messages || messages.length === 0) { // ✅ also guard against empty array
        throw new NotFoundError("No messages found");
    }

    return successResponse({ res, data: messages, message: "Messages found" });
};
//getUserMessages
export const getUserMessages = async (req, res, next) => {
    const { userId } = req.user;
    const message = await findById({
        model: MessageModel,
        id: userId,
        select: "content sender receiver createdAt",
        options: {
            populate: [
                {
                    path: "receiver",
                    select: "firstName lastName -_id ",
                },
            ],
        },
    });
    if (!message) {
        return next(new NotFoundError("Message not found"));
    }
    return successResponse({ res, message, statusCode: 200 });
}