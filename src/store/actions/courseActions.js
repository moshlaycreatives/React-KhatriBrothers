import api from '../../utils/Api'

export const addAdvance = (formValues) => async (dispatch) => {
  console.log('Starting API call at:', new Date().toISOString());
  try {
    const res = await api.post("/addCourse", formValues);

    console.log('Response from API:', res);
    console.log('API call completed at:', new Date().toISOString());

    return res;
  } catch (err) {
    throw err;

  }
};

export const getBeginnerCourse = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllBeginnerCourses",);
    dispatch({
      type: 'BEGINNER_COURSES',
      payload: { courses: res.data.data }
    })
    return res;

  } catch (err) {
    throw err;
  }
};


export const getAdvanceCourse = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllAdvancedCourses",);
    dispatch({
      type: 'ADVANCED_COURSES',
      payload: { courses: res.data.data }
    })
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



export const updateCourse = (courseId, formValues) => async (dispatch) => {
  try {
    const res = await api.patch(`/updateCourse/${courseId}`, formValues);

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


export const getRelatedCourses = (courseType) => async (dispatch) => {
  try {
    const res = await api.post(`/getRelatedCourses`, {courseType});

    return res;
  } catch (err) {
    throw err;
  }
};




