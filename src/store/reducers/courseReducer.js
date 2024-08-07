const initialState = {
  allCourses: [],
    selectedCourse: null,
  };

  const courseReducer = (state = initialState, action) => {
    switch (action.type) {


        case 'ALL_COURSES':
        return {
          ...state,
          allCourses: action.payload.courses,
        };
           case 'SELECTED_COURSE':
        return {
          ...state,
          selectedCourse: action.payload.course,
        };
      case 'DELETE_COURSE':
        return {
          ...state,
          beginnerCourses: state.beginnerCourses.filter(course => course.id !== action.payload.courseId),
          advancedCourses: state.advancedCourses.filter(course => course.id !== action.payload.courseId),
        };
      default:
        return state;
    }
  };

  export default courseReducer;
