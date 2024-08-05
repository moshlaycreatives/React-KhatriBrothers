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

export const getStudentData = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllEnrolledStudents",);
    dispatch({
      type: 'STUDENT_DATA',
      payload: { student: res.data.data }
    })
    console.log(res.data.data)

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

export const getSingleStudent = (enrollId) => async (dispatch) => {
  try {
    const res = await api.get(`/getEnrollDetailsById/${enrollId}`,);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getSingleInstructor = (instructorId) => async (dispatch) => {
  try {
    const res = await api.get(`/getInstructorById/${instructorId}`,);

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

export const sendSearchTerm = (searchTerm) => async (dispatch) => {
  console.log('hhhhh', searchTerm)
  try {
    const res = await api.post(`/searchApi?searchTerm=${encodeURIComponent(searchTerm)}`);

    return res;
  } catch (err) {
    console.error('searchterm send error',err)
    throw err;
  }
};



// -------------------payment --------------

export const firstPaymentApi = (values) => async (dispatch) => {


  try {
    const res = await api.post("/createCustomer", values);

    return res;
  } catch (err) {
    throw err;

  }
};


export const payment = (values, paymentId) => async (dispatch) => {

  try {
    const res = await api.post("/payment", {amount:values, customer_id:paymentId});

console.log(res, 'urlllll')
    return res;
  } catch (err) {
    throw err;

  }
};



export const getInstructors = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllInstructor");

    return res;

  } catch (err) {
    throw err;
  }
};


export const assignInstructor = (instructorId, enrollmentId) => async (dispatch) => {
  try {
    const res = await api.patch("/assignInstructor", {instructorId, enrollmentId});

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;

  }
};

export const assignedStudents = (instructorId) => async (dispatch) => {
  try {
    const res = await api.get(`/getAssignedCoursesByInstructor/${instructorId}`,);

    return res;
  } catch (err) {
    throw err;
  }
};