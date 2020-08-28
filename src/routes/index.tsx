import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';

// import Dashboard from '../pages/Dashboard';
import HostDashboard from '../pages/HostDashboard';
import EventHostDashboard from '../pages/EventHostDashboard';
import FriendsDashboard from '../pages/FriendsDashboard';
import EventsDashboard from '../pages/EventsDashboard';
import FriendEventDashboard from '../pages/FriendEventDashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/forgot-password" exact component={ForgotPassword} />
    <Route path="/reset-password" exact component={ResetPassword} />

    <Route path="/profile" exact component={Profile} isPrivate />
    <Route path="/events" exact component={EventsDashboard} isPrivate />
    <Route
      path="/dashboard/my-event"
      exact
      component={EventHostDashboard}
      isPrivate
    />
    <Route path="/dashboard" exact component={HostDashboard} isPrivate />
    <Route path="/friends" exact component={FriendsDashboard} isPrivate />
    <Route
      path="/friends/event"
      exact
      component={FriendEventDashboard}
      isPrivate
    />
  </Switch>
);

export default Routes;
