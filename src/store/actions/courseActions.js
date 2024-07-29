import api from '../../utils/Api'

export const addAdvance = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/addCourse", formValues);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getBeginnerCourse = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllBeginnerCourses",);

    return res;
  } catch (err) {
    throw err;
  }
};


export const getAdvanceCourse = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllAdvancedCourses",);

    return res;
  } catch (err) {
    throw err;
  }
};



export const getSingleCourse = (courseId) => async (dispatch) => {
  try {
    const res = await api.get(`/getCourseById/${courseId}`,);

    return res;
  } catch (err) {
    throw err;
  }
};


export const deleteSingleData = (courseId) => async (dispatch) => {
  try {
    const res = await api.patch(`/deleteCourse/${courseId}`,);

    return res;
  } catch (err) {
    throw err;
  }
};




