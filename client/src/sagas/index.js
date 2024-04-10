import { takeLatest } from "redux-saga/effects";
import ACTION_TYPES from "../actions/actionTypes";
import {
  createMessageSaga,
  getUserChatsSaga,
  getChatSaga,
  deleteMessageSaga,
} from "./chatSaga";
import {
  loginUserSaga,
  registerUserSaga,
  getUserDataSaga,
  logOutSaga,
} from "./userSaga";

function* rootSaga() {
  ////
  yield takeLatest(ACTION_TYPES.LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(ACTION_TYPES.REGISTER_USER_REQUEST, registerUserSaga);
  yield takeLatest(ACTION_TYPES.GET_USER_DATA_REQUEST, getUserDataSaga);
  ////
  yield takeLatest(ACTION_TYPES.SEND_NEW_MESSAGE_REQUEST, createMessageSaga);
  yield takeLatest(ACTION_TYPES.GET_USER_CHATS_REQUEST, getUserChatsSaga);
  yield takeLatest(ACTION_TYPES.GET_CHAT_WITH_MESSAGES_REQUEST, getChatSaga);
  yield takeLatest(ACTION_TYPES.LOGIN_USER_LOGOUT, logOutSaga);
  yield takeLatest(ACTION_TYPES.DELETE_MESSAGE_REQUEST, deleteMessageSaga);
}

export default rootSaga;
