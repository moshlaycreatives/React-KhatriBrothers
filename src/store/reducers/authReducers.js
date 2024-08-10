const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthenticatedAgent: false,
  isAuthenticatedAgents: false,

  token: localStorage.getItem("token"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      localStorage.setItem("token", action?.payload?.payload?.token);
      console.log(action.payload, "ACTIONNNNNNNNNNNNNNNNN");
      return {
        ...state,
        ...action.payload.payload,
        token: action.payload.payload.token,
        user: action.payload.payload.user,
        isAuthenticated: true,
      };
    }
    case "UPDATE_USER": {
      console.log(action.payload.payload.user, "UPDATE USER ACTION");
      return {
        ...state,
        ...action.payload.payload,
        user: action.payload.payload.user,
      };
    }
    case "SUCCESS_AGENT": {
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        ...action.payload.data,
        token: action.payload.data.token,
        isAuthenticatedAgent: true,
      };
    }

    case "LOGOUT_SUCCESS": {
      localStorage.removeItem("token");
      console.log("Logout successful, token removed from localStorage and Redux store");
      return {
        token: null,
        isAuthenticated: false,
        isAuthenticatedAgent: false,
        user: null,
      };
    }

    case "VERIFY_OTP": {
      localStorage.setItem("token", action.payload.data.token);
      // console.log(action.payload);
      return {
        ...state,
        ...action.payload.data,
        token: action.payload.data.token,
        isAuthenticated: true,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
