import api from "../../utils/Api"


export const addProduct = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/addProduct", formData);

    return res;
  } catch (err) {
    throw err;
  }
};


export const getAllProducts = () => async (dispatch) => {

  try {
    const res = await api.get("getAllProducts",);
    return res;
  } catch (err) {
    throw err;
  }
};



export const getAllMyProducts = () => async (dispatch) => {

  try {
    const res = await api.get("getAllMyProducts",);
    return res;
  } catch (err) {
    throw err;
  }
};


export const getApprovedProducts = () => async (dispatch) => {

  try {
    const res = await api.get("getAllApprovedProducts",);
    return res;
  } catch (err) {
    throw err;
  }
};



export const deleteProduct = (productId) => async (dispatch) => {

  try {
    const res = await api.delete(`/deleteProduct/${productId}`);
    return res;
  } catch (err) {
    throw err;
  }
};



export const updateProductStatus = (productId) => async (dispatch) => {

  try {
    const res = await api.patch(`/updateProductStatus/${productId}`);
    return res;
  } catch (err) {
    throw err;
  }
};


export const getSingleProduct = (id) => async (dispatch) => {

  try {
    const res = await api.get(`/getProductById/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};
