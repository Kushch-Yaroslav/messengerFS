import { put } from "redux-saga/effects";
import {
  addNewMessage,
  getUserChats,
  getChatWithMessages,
  deleteMessages,
  updateMessage,
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
  updateMessageError,
  updateMessageSuccess,
} from "../actions/actionCreators";

export function* createMessageSaga(action) {
  try {
    const {
      data: { data },
    } = yield addNewMessage(action.payload);
    yield put(sendNewMessageSuccess(data));
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
    yield deleteMessages(action.payload);
    yield put(deleteMessagesSuccess(messageIds));
  } catch (error) {
    yield put(deleteMessagesError(error));
  }
}

export function* updateMessageSaga(action) {
  const { messageId, updateData } = action.payload;
  try {
    const response = yield updateMessage(messageId, updateData);
    yield put(updateMessageSuccess(response.data));
  } catch (error) {
    yield put(updateMessageError(error));
  }
}
