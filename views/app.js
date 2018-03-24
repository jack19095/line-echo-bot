import React from 'react';
import BookingCreate from './booking-create';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

const APP_URL_ROOT = '/app';

const List = () => (
  <ul>
    <li><Link to={`${APP_URL_ROOT}`}>Home</Link></li>
    <li><Link to={`${APP_URL_ROOT}/booking/create`}>Booking Create</Link></li>
  </ul>
);

const ROUTER_TABLE = [
  { path: `${APP_URL_ROOT}`, component: List, exact: true },
  { path: `${APP_URL_ROOT}/booking/create`, component: BookingCreate },
];

const App = () => (
  <Router>
    <div>
      {ROUTER_TABLE.map((element, index) => {
        console.log(element);
        return <Route exact path={element.path} component={element.component} key={index}/>;
      })}
    </div>
  </Router>
);
export default App;
