import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import HostDashboard from '../pages/HostDashboard';
import EventHostDashboard from '../pages/EventHostDashboard';
import WelcomePage from '../pages/WelcomePage';
import ImageGallery from '../pages/ImageGallery';
import CalendarPage from '../pages/CalendarPage';
import EventExternalPage from '../pages/EventExternalPage';
import { FriendsPage } from '../pages/FriendsPage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        path="/event/:event_name/:guest_id"
        exact
        component={EventExternalPage}
        isPrivate
      />
      <Route path="/" exact component={Main} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />

      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />
      <Route path="/welcome" exact component={WelcomePage} />
      <Route path="/event/:event_name" exact component={EventExternalPage} />
      <Route
        path="/event/:event_name/:guest_id"
        exact
        component={EventExternalPage}
      />

      <Route
        path="/dashboard/my-event/:name"
        exact
        component={EventHostDashboard}
        isPrivate
      />
      <Route path="/dashboard" exact component={HostDashboard} isPrivate />
      <Route path="/images" exact component={ImageGallery} isPrivate />
      <Route path="/friends" exact component={FriendsPage} isPrivate />
      <Route path="/calendar" exact component={CalendarPage} isPrivate />
    </Switch>
  );
};

export default Routes;
