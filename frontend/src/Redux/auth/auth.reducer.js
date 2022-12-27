import * as types from "./auth.actionType";
let token = JSON.parse(localStorage.getItem("token"));
const initState = {
  isAuth: false,
  isLoading: false,
  isError: false,
  user: {},
  token: token || "",
  msg: "",
};

export const userReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: payload,
      };
    case types.SIGNUP_FAILURE:
      return {
        isError: true,
        isLoading: false,
        msg: payload,
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(payload.token));
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: payload.data,
        msg: payload.msg,
      };
    case types.LOGIN_FAILURE:
      return {
        isAuth: false,
        isError: true,
      };
    case types.LOGIN_OUT:
      return {
        token: null,
      };
    default:
      return state;
  }
};
