const { Router } = require("express");
const { checkToken } = require("../middleware/checkToken");

const ChatController = require("../controllers/chat.controller");
const chatRouter = Router();

chatRouter.post("/", checkToken, ChatController.createChat);
chatRouter.post("/:chatId", checkToken, ChatController.addNewMessage);
chatRouter.get("/:chatId", checkToken, ChatController.getChatWithMessages);
chatRouter.get("/user/all", checkToken, ChatController.getAllUserChats);
chatRouter.put("/:chatId", checkToken, ChatController.addUserToChat);
chatRouter.patch(
  "/messages/:messageId",
  checkToken,
  ChatController.updateMessage
);
chatRouter.delete(
  "/:chatId/messages",
  checkToken,
  ChatController.deleteMessages
);

module.exports = chatRouter;
