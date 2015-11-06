import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';

export default function() {
  return (
    <Route component={App}>
      <Route path='/' component={Home} />
    </Route>
  );
}
