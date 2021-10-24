import React from 'react';
import { Route } from 'react-router-dom';
import CourseCreate from '../components/layout/course/ui/CourseCreate';
import Home from '../components/layout/home/Home';
import { ProtectedRoute } from './ProtectedRoute';
import { TeacherRoute } from './TeacherRoute';
import AuthRoute from './AuthRoute';
import UploadProgress from '../components/module/UI/Progress/UploadProgress';
import courseDetail from '../components/layout/course/ui/course/CourseDetail'
import Lesson from '../components/layout/lesson/lesson'
import CourseEnrolled from '../components/module/learner/CourseEnrolled'
import VideoWatching from '../components/module/learner/VideoWatching'
import CoursePagination from '../components/layout/course/ui/course/CoursePagination'
import Profile  from '../components/layout/profile/Profile'
import UserCourses from '../components/layout/user_course/UserCourses';


const Routes = () => {
  return (
    <>
      <Route path="/" component={Home} exact />
      <Route path="/courseenrolled" component={CourseEnrolled} exact />
      <Route path="/videowatching" component={VideoWatching} exact />
      <Route path="/profile/:id" component={Profile} exact />
      <Route path="/courses" component={CoursePagination} exact />
      <Route path="/course/:id" component={courseDetail} exact />
      <Route
        exact
        path="/user/course/create"
        render={({ url }) => (
          <TeacherRoute path={url} component={CourseCreate} exact />
        )}
      />
      <Route
        exact
        path="/user/course"
        render={({ url }) => (
          <ProtectedRoute path={url} component={UserCourses} exact />
        )}
      />
      <Route
        exact
        path="/chapter/:id"
        render={({ url }) => (
          <ProtectedRoute path={url} component={Lesson} exact />
        )}
      />
      {/* <Route
        exact
        path="/course/:id"
        render={({ url }) => (
          <ProtectedRoute path={url} component={courseDetail} exact />
        )}
      /> */}
      <Route
        exact
        path="/signin"
        render={(props) => <AuthRoute {...props} authRoute="signin" />}
      />
      <Route
        exact
        path="/signup"
        render={(props) => <AuthRoute {...props} authRoute="signup" />}
      />
      <Route exact path="/test-upload">
        <UploadProgress />
      </Route>
    </>
  );
};

export default Routes;
