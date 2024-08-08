import api from '../../utils/Api'

export const userRegister = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/register", formValues);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;
  }
};

export const userLogin = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/login", formValues);
    const { token} = res.data;
    const user = res.data.data

    console.log(res.data.data, 'dataaaa')
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        payload: { token, user },

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
    const res = await api.post("/verifyForgotPasswordOTP", { email, forgotPasswordOtp });

    return res;
  } catch (err) {
    throw err;
  }
};


export const resendotpcode = ({ email }) => async (dispatch) => {
  try {
    const res = await api.post("/resendOtp", { email });

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
export const changePassword = (formValues) => async (dispatch) => {
  try {
    const res = await api.patch("/changePassword", formValues);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;
  }
};

export const updateProfile = (formValues) => async (dispatch) => {
  try {
    const res = await api.patch("/updateProfile", formValues, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }});


      const user = res.data.data


      dispatch({
        type: 'UPDATE_USER',
        payload: {
          payload: {user}
        }
      });



    return res;
  } catch (err) {
    throw err;
  }
};



export const contactUser = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/createContact", formValues);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAllUsers = () => async (dispatch) => {
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

export const EnrollCustomer = (courseId, installment, classType) => async (dispatch) => {
  try {
    const payload= {courseId, installment, classType}
    const res = await api.post("/addEnrollment", payload);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;
  }
};