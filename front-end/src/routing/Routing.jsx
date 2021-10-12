import React from 'react';
import { Route } from 'react-router-dom';
import CourseCreate from '../components/layout/course/ui/CourseCreate';
import Home from '../components/layout/home/Home';
import { ProtectedRoute } from './ProtectedRoute';
import { TeacherRoute } from './TeacherRoute';
import AuthRoute from './AuthRoute';
import UploadProgress from '../components/module/UI/Progress/UploadProgress';

const Routes = () => {
  return (
    <>
      <Route path="/" component={Home} exact />
      <Route
        exact
        path="/teacher/course/create"
        render={({ url }) => (
          <TeacherRoute path={url} component={CourseCreate} exact />
        )}
      />
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
