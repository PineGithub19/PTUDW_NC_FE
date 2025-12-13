export const ENDPOINTS = {
  // demo
  getCourseDetails: (courseId: string) => `/courses/${courseId}`,
  getCourses: `/courses`,
  createCourse: `/courses/create`,

  // auth - jwt
  login: `/auth/login`,
  register: `/auth/register`,
  logout: `/auth/logout`,

  // auth - session
  checkAuthSession: `/auth/me`,
};
