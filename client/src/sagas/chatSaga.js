import { put } from "redux-saga/effects";
import {
  addNewMessage,
  getUserChats,
  getChatWithMessages,
  deleteMessages,
} from "../api";
import {
  getChatWithMessagesError,
  getChatWithMessagesSuccess,
  sendNewMessageSuccess,
  sendNewMessageError,
  getUserChatsSuccess,
  getUserChatsError,
  needAuthentication,
  otherError,
  networkError,
  deleteMessagesSuccess,
  deleteMessagesError,
} from "../actions/actionCreators";
import { socket } from "../api/socket";

export function* createMessageSaga(action) {
  try {
    const {
      data: { data },
    } = yield addNewMessage(action.payload);

    yield put(sendNewMessageSuccess(data));
    // socket.emit("NEW_MESSAGE", action.payload);
  } catch (error) {
    yield put(sendNewMessageError(error));
  }
}

export function* getUserChatsSaga(action) {
  try {
    const {
      data: { data },
    } = yield getUserChats();
    yield put(getUserChatsSuccess(data));
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (error.response && error.response.status === 401) {
        yield put(needAuthentication());
      } else {
        yield put(otherError(status));
      }
    } else {
      yield put(networkError(error.toString()));
    }
  }
}

export function* getChatSaga(action) {
  try {
    const {
      data: { data },
    } = yield getChatWithMessages(action.payload);
    yield put(getChatWithMessagesSuccess(data));
  } catch (error) {
    yield put(getChatWithMessagesError(error));
  }
}

export function* deleteMessageSaga(action) {
  const { chatId, messageIds } = action.payload;
  try {
    console.log(`Saga deleting messages: ${messageIds} from chat: ${chatId}`);
    yield deleteMessages({ chatId, messageIds });
    yield put(deleteMessagesSuccess());
  } catch (error) {
    yield put(deleteMessagesError(error));
  }
}
