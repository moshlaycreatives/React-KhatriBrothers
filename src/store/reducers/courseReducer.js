const initialState = {
    beginnerCourses: [],
    advancedCourses: [],
    selectedCourse: null,
  };

  const courseReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'BEGINNER_COURSES':
        return {
          ...state,
          beginnerCourses: action.payload.courses,
        };
      case 'ADVANCED_COURSES':
        return {
          ...state,
          advancedCourses: action.payload.courses,
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
