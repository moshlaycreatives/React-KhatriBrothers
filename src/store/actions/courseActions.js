import api from "../../utils/Api";

export const addAdvance = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/addCourse", formValues);

    console.log("Response from API:", res);

    return res;
  } catch (err) {
    throw err;
  }
};

export const studentAddCourse = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/studentAddCourse", formValues);

    console.log("Response from API:", res);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getCustomCourse = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllCustomCourses");

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAllCourse = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllCourses");
    dispatch({
      type: "ALL_COURSES",
      payload: { courses: res.data.data },
    });
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
    const res = await api.get("/getAllCourses");

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAdvanceCourse = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllAdvancedCourses");

    return res;
  } catch (err) {
    throw err;
  }
};

export const getStudentData = (page) => async (dispatch) => {
  try {
    const res = await api.get(`/getAllEnrolledStudents?page=${page}`);
    dispatch({
      type: "STUDENT_DATA",
      payload: { student: res.data.data },
    });
    console.log(res.data.data);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getSingleCourse = (courseId) => async (dispatch) => {
  try {
    const res = await api.get(`/getCourseById/${courseId}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getSingleStudent = (enrollId) => async (dispatch) => {
  try {
    const res = await api.get(`/getEnrollDetailsById/${enrollId}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getSingleInstructor = (instructorId) => async (dispatch) => {
  try {
    const res = await api.get(`/getInstructorById/${instructorId}`);

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
    const res = await api.patch(`/deleteCourse/${courseId}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getRelatedCourses = (courseType) => async (dispatch) => {
  try {
    const res = await api.post(`/getRelatedCourses`, { courseType });

    return res;
  } catch (err) {
    throw err;
  }
};

export const sendSearchTerm = (searchTerm, userType) => async (dispatch) => {
  console.log("userType", userType);
  try {
    const res = await api.post(
      `/searchApi?searchTerm=${encodeURIComponent(searchTerm)}`,
      { userType: userType }
    );

    return res;
  } catch (err) {
    console.error("searchterm send error", err);
    throw err;
  }
};

export const groupSearch = (searchTerm) => async (dispatch) => {
  try {
    const res = await api.get(
      `/searchGroup?searchTerm=${encodeURIComponent(searchTerm)}`
    );

    return res;
  } catch (err) {
    console.error("searchterm send error", err);
    throw err;
  }
};

export const adminMessageSearch = (searchTerm) => async (dispatch) => {
  try {
    const res = await api.get(
      `/searchChat?searchTerm=${encodeURIComponent(searchTerm)}`
    );

    return res;
  } catch (err) {
    console.error("searchterm send error", err);
    throw err;
  }
};

export const searchStudentsOfInstructor =
  (searchTerm, instructorId) => async (dispatch) => {
    console.log(instructorId, "api inst id");
    try {
      const res = await api.post(
        `/searchStudentsOfInstructor?searchTerm=${searchTerm}`,
        { instructorId }
      );

      return res;
    } catch (err) {
      console.error("searchterm send error", err);
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

export const payment =
  (values, paymentId, installment, currency) => async (dispatch) => {
    try {
      const res = await api.post("/payment", {
        amount: values,
        customer_id: paymentId,
        installment: installment,
        currency: currency,
      });

      console.log(res, "urlllll");
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

export const assignInstructor =
  (instructorId, enrollmentId) => async (dispatch) => {
    try {
      const res = await api.patch("/assignInstructor", {
        instructorId,
        enrollmentId,
      });

      console.log("Response from API:", res);

      return res;
    } catch (err) {
      throw err;
    }
  };

export const assignedStudents =
  (instructorId, currentPage) => async (dispatch) => {
    try {
      const res = await api.get(
        `/getAssignedCoursesByInstructor/${instructorId}?page=${currentPage}`
      );

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

    console.log("Response from API:", res);
    console.log("API call completed at:", new Date().toISOString());

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

    console.log("Response from API:", res);

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

    console.log("Response from API:", res);

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

    console.log("Response from API:", res);

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

export const getStudentClass = () => async (dispatch) => {
  try {
    const res = await api.get(`getAllClassDetailsStudent`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getPrevClass = () => async (dispatch) => {
  try {
    const res = await api.get(`getPreviousClassDetailsStudent`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getStudentEnrolledCourses = () => async (dispatch) => {
  try {
    const res = await api.get(`getAllCoursesByStudent`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getStudentTestimonial = () => async (dispatch) => {
  try {
    const res = await api.get(`getAllOwnTestimonial`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteGroupMember =
  (groupid, studentIndex) => async (dispatch) => {
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
  } catch (err) {
    throw err;
  }
};

export const createLectureContent = (data) => async (dispatch) => {
  try {
    const res = await api.patch(`/uploadContent`, data);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAllStudentClassDetails = (courseId) => async (dispatch) => {
  try {
    const res = await api.get(`/getAllClassDetailsStudentCourse/${courseId}`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllInstructorClassDetails = (courseId) => async (dispatch) => {
  try {
    const res = await api.get(`/getCourseDetailsByLecture/${courseId}`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getStudentDashboardDetail = () => async (dispatch) => {
  try {
    const res = await api.get(`/studentReporting`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAdminDashboardDetail = () => async (dispatch) => {
  try {
    const res = await api.get(`/adminReporting`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAllPayments = () => async (dispatch) => {
  try {
    const res = await api.get(`/getAllPayments`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getInstructorDashboardDetail = () => async (dispatch) => {
  try {
    const res = await api.get(`/instructorReporting`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const addBlogs = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/createArticle", formValues);

    console.log("Response from API:", res);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getBlogs = () => async (dispatch) => {
  try {
    const res = await api.get(`/getAllArticles`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getDetailBlog = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/getArticleById/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    const res = await api.patch(`/deleteArticle/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const studentApplyFreeTrails = (values) => async (dispatch) => {
  console.log(values, 'values')
  try {
    const res = await api.post("/startFreeTrial", values);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAdminFreeTrails = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllFreeTrialsAdmin");

    return res;
  } catch (err) {
    throw err;
  }
};

export const getStudentJoinFreeTrails = () => async (dispatch) => {
  try {
    const res = await api.get("/getFreeTrialStudent");

    return res;
  } catch (err) {
    throw err;
  }
};

export const addAdminTrail = (trailId, values) => async (dispatch) => {
  try {
    const res = await api.patch(`/adminScheduleTrialLec/${trailId}`, values);

    return res;
  } catch (err) {
    throw err;
  }
};

export const adminChangeTrailStatus = (userId) => async (dispatch) => {
  try {
    const res = await api.patch(`/adminFinishTrial/${userId}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const getRecentMessage = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllConversations");

    return res;
  } catch (err) {
    throw err;
  }
};

export const trialDateAdmin = (values) => async (dispatch) => {
  try {
    const res = await api.post("/createSchedule", {time : values});

    return res;
  } catch (err) {
    throw err;
  }
};


export const getStdTime = () => async (dispatch) => {
  try {
    const res = await api.get("/getTimeSlots");

    return res;
  } catch (err) {
    throw err;
  }
};



export const getAdminTime = () => async (dispatch) => {
  try {
    const res = await api.get("/getAllSlotsAdmin");

    return res;
  } catch (err) {
    throw err;
  }
};




export const adminsendSuggestedCourse = (freetrialId, feedback) => async (dispatch) => {
  try {
    const res = await api.patch(`/freetrialFeedback/${freetrialId}`, {feedback:feedback});

    return res;
  } catch (err) {
    throw err;
  }
};

//=========================================paypal payment===================



export const PaypalPayment =
  (PaypalValues) => async (dispatch) => {
    const {price, installment, currency} = PaypalValues
    try {
      const res = await api.post("/createOrderPaypal", {
        amount: price,
        // customer_id: paymentId,
        installment: installment,
        currency: currency,
      });

      console.log(res, "urlllll");
      return res;
    } catch (err) {
      throw err;
    }
  };





// -------------------------razorpay API -------------------

export const createRazorpayOrder = (paymentDetails) => async (dispatch) => {
  try {
    const res = await api.post(`/createOrder`, paymentDetails);
console.log(res, 'rezorpay response')
    return res;
  } catch (err) {
    throw err;
  }
};



// export const createRazorpayOrder = (paymentDetails) => async (dispatch) => {
//   try {
//     dispatch({ type: "RAZORPAY_ORDER_REQUEST" });

//     const { data } = await axios.post("/createOrder", paymentDetails); // Call backend to create Razorpay order

//     dispatch({
//       type: "RAZORPAY_ORDER_SUCCESS",
//       payload: data,
//     });

//     return data; // Return data to handle Razorpay payment
//   } catch (error) {
//     dispatch({
//       type: "RAZORPAY_ORDER_FAIL",
//       payload: error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message,
//     });
//     throw error; // Throw error to handle it in the component
//   }
// };