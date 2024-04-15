import ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  user: null,
  chatList: [],
  currentChat: null,
  error: null,
  isFetching: false,
  notification: null,
  needAuthentication: false,
  errorMessage: "",
};

function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case ACTION_TYPES.SEND_NEW_MESSAGE_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        currentChat: {
          // обновляем только текущий чат
          ...state.currentChat, // копирование всех свойств текущего чата
          messages: [...state.currentChat.messages, data], // создание нового массива сообщений, которое включает все предыдущие сообщеия + новое(data)
        },
      };
    }
    case ACTION_TYPES.NEW_MESSAGE_RECEIVED: {
      const { data } = action;
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: [...state.currentChat.messages, data],
        },
      };
    }

    case ACTION_TYPES.GET_USER_CHATS_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        chatList: data,
        needAuthentication: false,
      };
    }

    case ACTION_TYPES.GET_CHAT_WITH_MESSAGES_SUCCESS: {
      const { data } = action;
      console.log(action);
      return {
        ...state,
        currentChat: data,
      };
    }
    case ACTION_TYPES.GET_USER_DATA_SUCCESS:
    case ACTION_TYPES.REGISTER_USER_SUCCESS:
    case ACTION_TYPES.LOGIN_USER_SUCCESS: {
      const { data } = action;
      return {
        ...state,
        user: data,
        needAuthentication: false,
      };
    }
    case ACTION_TYPES.NEED_AUTHENTICATION: {
      return { ...state, needAuthentication: true };
    }
    case ACTION_TYPES.OTHER_ERROR: {
      return {
        ...state,
        errorMessage: `Произошла ошибка ${action.payload.error}`,
      };
    }
    case ACTION_TYPES.NETWORK_ERROR: {
      return {
        ...state,
        errorMessage: `Произошла ошибка ${action.payload.error}`,
      };
    }
    case ACTION_TYPES.DELETE_MESSAGE_ERROR:
    case ACTION_TYPES.GET_CHAT_WITH_MESSAGES_ERROR:
    case ACTION_TYPES.LOGIN_USER_ERROR:
    case ACTION_TYPES.REGISTER_USER_ERROR:
    case ACTION_TYPES.SEND_NEW_MESSAGE_ERROR: {
      const { error } = action;
      return {
        ...state,
        error: action.error,
      };
    }

    case ACTION_TYPES.GET_USER_CHATS_REQUEST:
    case ACTION_TYPES.REGISTER_USER_REQUEST:
    case ACTION_TYPES.LOGIN_USER_REQUEST:
    case ACTION_TYPES.SEND_NEW_MESSAGE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case ACTION_TYPES.NOTIFICATION: {
      const { data } = action;
      return {
        ...state,
        notification: data,
      };
    }
    case ACTION_TYPES.LOGIN_USER_LOGOUT: {
      return initialState;
    }
    case ACTION_TYPES.DELETE_MESSAGE_REQUEST: {
      return { ...state };
    }
    case ACTION_TYPES.DELETE_MESSAGE_SUCCESS: {
      const { data } = action;

      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: state.currentChat.messages.filter(
            (message) => !data.includes(message._id)
          ),
        },
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
