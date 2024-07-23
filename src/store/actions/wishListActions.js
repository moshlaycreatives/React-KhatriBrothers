import api from "../../utils/Api";

export const addToWishList = (a_id) => async (dispatch) => {
  try {
    const res = await api.post("user/wishlist");
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
