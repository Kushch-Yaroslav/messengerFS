const { Chat, Message } = require("../models");

module.exports.createChat = async (req, res, next) => {
  try {
    const { body } = req;
    const newChat = await Chat.create(body);
    res.status(201).send({ data: newChat });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserToChat = async (req, res, next) => {
  try {
    const {
      body: { userId },
      params: { chatId },
    } = req;
    const chatInstance = await Chat.findById(chatId);
    console.log(chatInstance);
    chatInstance.members.push(userId);
    chatInstance.save();
    res.status(200).send(chatInstance);
  } catch (error) {
    next(error);
  }
};

module.exports.addNewMessage = async (req, res, next) => {
  try {
    const {
      body,
      params: { chatId },
      payload: { userId },
    } = req;
    console.log(body);
    const chatInstance = await Chat.findById(chatId);
    const newMessage = await Message.create({
      ...body,
      chatId,
      author: userId,
    });
    await newMessage.populate("author", "firstName lastName");
    chatInstance.messages.push(newMessage);
    chatInstance.save();
    console.log(`отправка клиенту ${newMessage}`);
    res.status(201).send({ data: newMessage });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUserChats = async (req, res, next) => {
  try {
    const {
      payload: { userId },
    } = req;
    const usersChat = await Chat.find(
      {
        members: userId,
      },
      "name members"
    );
    res.status(200).send({ data: usersChat });
  } catch (error) {
    next(error);
  }
};

module.exports.getChatWithMessages = async (req, res, next) => {
  try {
    const {
      params: { chatId },
    } = req;
    const chatWithMessages = await Chat.findById(chatId).populate({
      path: "messages",
      populate: { path: "author", select: "firstName lastName" }, //из
    });
    res.status(200).send({ data: chatWithMessages });
  } catch (error) {
    next(error);
  }
};
