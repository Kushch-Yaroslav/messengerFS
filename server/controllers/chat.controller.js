const { Chat, Message, User } = require("../models");

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
    if (chatInstance.members.includes(userId)) {
      res.status(400).send({ message: "Пользователь уже в чате" });
    }
    chatInstance.members.push(userId);
    chatInstance.save();
    res.status(200).send(chatInstance);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.addNewMessage = async (req, res, next) => {
  try {
    const {
      body,
      params: { chatId },
      payload: { userId }, //payload содержит информацию о пользователе из токена.
    } = req;
    const chatInstance = await Chat.findById(chatId);
    const newMessage = await Message.create({
      ...body,
      chatId,
      author: userId,
    });
    await newMessage.populate("author", "firstName lastName");
    chatInstance.messages.push(newMessage);
    chatInstance.save();
    res.status(201).send({ data: newMessage });
  } catch (error) {
    next(error);
  }
};
module.exports.updateMessage = async (req, res, next) => {
  try {
    const {
      params: { messageId },
      payload: { userId },
      body: { body },
    } = req;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).send({ message: "Сообщение не найдено" });
    }
    if (message.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .send({ message: "Нет прав на редактирование сообщений" });
    }
    const updateMessage = await Message.findByIdAndUpdate(
      messageId,
      { body: body },
      {
        new: true,
      }
    ).populate("author", "_id firstName lastName");
    if (updateMessage) {
      res.status(200).send({ data: updateMessage });
    } else {
      res.status(404).send({ message: "Ошибка при обновлении сообщения" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteMessages = async (req, res, next) => {
  try {
    const {
      params: { chatId },
      body: { messageIds },
    } = req;
    console.log("SERVER CHATID", chatId);
    console.log("SERVER MESSAGEID", messageIds);
    if (!Array.isArray(messageIds) || messageIds.length === 0) {
      return res.status(400).send({ message: "Нету переданных сообщений" });
    }
    const updateChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { messages: { $in: messageIds } },
      },
      { new: true }
    );
    if (!updateChat) {
      return res.status(404).send({ message: "Чат не найден" });
    }
    await Message.deleteMany({ _id: { $in: messageIds } });
    res.status(200).send(`Сообщения: id ${messageIds} удалены`);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUserChats = async (req, res, next) => {
  try {
    const {
      payload: { userId },
    } = req;
    const usersChat = await Chat.find({
      members: userId,
    });
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
    const chatWithMessages = await Chat.findById(chatId)
      .populate({
        path: "messages",
        populate: { path: "author", select: "firstName lastName" },
      })
      .populate("members", "firstName lastName")
      .exec();
    res.status(200).send({ data: chatWithMessages });
  } catch (error) {
    next(error);
  }
};
