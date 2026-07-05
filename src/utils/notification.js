import { notificationModel } from "../models/notification.model.js";

const requestNotification = async (receiverId , type , title) => {
    await notificationModel.create({
        receiverId ,
        type ,
        message : title
    })
}

export default requestNotification;