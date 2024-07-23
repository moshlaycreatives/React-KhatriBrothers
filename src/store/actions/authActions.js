import api from '../../utils/Api'

export const userRegister = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/registerUser", formValues);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;
  }
};

export const userLogin = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/login", formValues);
    const { token, user } = res.data;
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        payload: { token, user }
      }
    });

    return res;
  } catch (err) {
    throw err;
  }
};


export const forgetPassword = ({email}) => async (dispatch) => {
  try {
    const res = await api.post("/forgetPassword", {email});

    return res;
  } catch (err) {
    throw err;
  }
};


export const verifyPassword = ({ email, forgotPasswordOtp }) => async (dispatch) => {
  try {
    const res = await api.post("/verifyOTP", { email, forgotPasswordOtp });

    return res;
  } catch (err) {
    throw err;
  }
};


export const resetPassword = ({ email, password, confirmPassword }) => async (dispatch) => {
  try {
    const res = await api.post("/resetPassword", { email, password, confirmPassword });

    return res;
  } catch (err) {
    throw err;
  }
};


export const getSellers = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllUsers",);

    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteSellers = (id) => async (dispatch) => {
  try {
    const res = await api.delete("/getAllUsers",);

    return res;
  } catch (err) {
    throw err;
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    localStorage.removeItem('token');

    dispatch({ type: 'LOGOUT_SUCCESS' });
  } catch (err) {
    throw err;
  }
};
