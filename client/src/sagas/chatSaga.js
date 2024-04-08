import { put } from "redux-saga/effects";
import { addNewMessage, getUserChats, getChatWithMessages } from "../api";
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
} from "../actions/actionCreators";

export function* createMessageSaga(action) {
  try {
    const {
      data: { data },
    } = yield addNewMessage(action.payload);
    // По результату запиту - створити action з відповідю сервера і донести його до редьюсера
    yield put(sendNewMessageSuccess(data));
  } catch (error) {
    // Якщо сталася помилка - ми маємо зробити новий action з помилкою і донести його до редьюсера
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
