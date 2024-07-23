import api from "../../utils/Api";

export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllPrimaryCategory");
    dispatch({ type: 'GET_ALL_CATEGORIES_SUCCESS', payload: res.data });

    return res;
  } catch (err) {
    throw err;
  }
};


export const addPrimaryCategory = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/addPrimaryCategory", formData);

    return res;
  } catch (err) {
    throw err;
  }
};


export const deletePrimaryCategory = (categoryId) => async (dispatch) => {
  try {
    const res = await api.delete(`/deletePrimaryCategory/${categoryId}`);

    return res;
  } catch (err) {
    throw err;
  }
};


export const updatePrimaryCategory = (updateCategory) => async (dispatch) => {
  try {
    const res = await api.patch(`/updatePrimarycategory/${updateCategory.id}`, updateCategory);
    // Dispatch an action if you want to handle the response in a reducer
    dispatch({
      type: 'UPDATE_PRIMARY_CATEGORY',
      payload: res.data,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

