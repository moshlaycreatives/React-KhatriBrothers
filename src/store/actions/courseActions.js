import api from '../../utils/Api'

export const addAdvance = (formValues) => async (dispatch) => {
  // console.log('Starting API call at:', new Date().toISOString());
  try {
    const res = await api.post("/addCourse", formValues);

    console.log('Response from API:', res);
    // console.log('API call completed at:', new Date().toISOString());

    return res;
  } catch (err) {
    throw err;

  }
};




export const getAllCourse = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllCourses",);
    dispatch({
      type: 'ALL_COURSES',
      payload: { courses: res.data.data }
    })
    return res;

  } catch (err) {
    throw err;
  }
};



export const getAssignedStudents = (id) => async (dispatch) => {
  try {
    const res = await api.get(`getAllStudentsByInstructor/${id}`);
    return res;

  } catch (err) {
    throw err;
  }
};




export const getAssignedCourses = (id) => async (dispatch) => {
  try {
    const res = await api.get(`getAssignedCoursesByInstructor/${id}`);
    return res;

  } catch (err) {
    throw err;
  }
};



export const getBeginnerCourse = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllCourses",);

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

export const getStudentData = (page) => async (dispatch) => {
  try {
    const res = await api.get(`/getAllEnrolledStudents?page=${page}`,);
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

export const sendSearchTerm = (searchTerm,userType) => async (dispatch) => {
  console.log('hhhhh', searchTerm)
  try {
    const res = await api.post(`/searchApi?searchTerm=${encodeURIComponent(searchTerm)}`, {userType:userType});

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


export const payment = (values, paymentId, installment, currency) => async (dispatch) => {

  try {
    const res = await api.post("/payment", {amount:values, customer_id:paymentId, installment:installment, currency:currency});

console.log(res, 'urlllll')
    return res;
  } catch (err) {
    throw err;

  }
};



export const getInstructors = (page) => async (dispatch) => {
  try {
    const res = await api.get(`/getAllInstructor?page=${page}`);

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

export const assignedStudents = (instructorId, currentPage) => async (dispatch) => {
  try {
    const res = await api.get(`/getAssignedCoursesByInstructor/${instructorId}?page=${currentPage}`,);

    return res;
  } catch (err) {
    throw err;
  }
};

// student side add testimonial
export const addStudentsTestimonial = (formValues) => async (dispatch) => {
  // console.log('Starting API call at:', new Date().toISOString());
  try {
    const res = await api.post("/createTestimonial", formValues);

    console.log('Response from API:', res);
    console.log('API call completed at:', new Date().toISOString());

    return res;
  } catch (err) {
    throw err;

  }
};

export const getAllTestimonial = () => async (dispatch) => {
  try {
    const res = await api.get(`/getAllTestimonial`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const acceptTestimonial = (testimonialId) => async (dispatch) => {
  try {
    const res = await api.patch(`/updateTestimonialStatus/${testimonialId}`);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;

  }
};

export const getPublicTestimonial = () => async (dispatch) => {
  try {
    const res = await api.get(`getAllTestimonialPublic`);

    return res;
  } catch (err) {
    throw err;
  }
};


export const addInstructor = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/addInstructor", formValues);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;

  }
};





export const getAllContacts = () => async (dispatch) => {
  try {
    const res = await api.get(`getAllContacts`);

    return res;
  } catch (err) {
    throw err;
  }
};


export const getNotification = () => async (dispatch) => {
  try {
    const res = await api.get(`getAllNotifications`);

    return res;
  } catch (err) {
    throw err;
  }
};




export const deleteInstructor = (Id) => async (dispatch) => {
  try {
    const res = await api.patch(`/deleteInstructor/${Id}`);

    return res;
  } catch (err) {
    throw err;
  }
};





export const createGroup = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/createGroup", formValues);

    console.log('Response from API:', res);

    return res;
  } catch (err) {
    throw err;

  }
};


export const getAllGroups = () => async (dispatch) => {
  try {
    const res = await api.get(`getAllGroupsByInstructorId`);

    return res;
  } catch (err) {
    throw err;
  }
};




export const getInstructorClass = () => async (dispatch) => {
  try {
    const res = await api.get(`getAllClassDetailsInstructor`);

    return res;
  } catch (err) {
    throw err;
  }
};




export const deleteGroupMember = (groupid, studentIndex) => async (dispatch) => {
  try {
    const res = await api.patch(`deleteGroupMember/${groupid}`, studentIndex);

    return res;
  } catch (err) {
    throw err;
  }
};
export const createClass = (formValues) => async (dispatch) => {
  try {
    const res = await api.post(`/createClass`, formValues);

    return res;
  } catch (err) {
    throw err;
  }
};

// get counter card data =======================================

export const getCounterCardData = () => async (dispatch) => {
  try {
    const res = await api.get("/homepageReporting");

    return res.data;
  }catch (err) {
    throw err;
  }};

export const createLectureContent = (data) => async (dispatch) => {
  try {
    const res = await api.patch(`/uploadContent`, data);

    return res;
  } catch (err) {
    throw err;
  }
};