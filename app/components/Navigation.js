import React from 'react';
import { Link, IndexLink } from 'react-router';
import Social from './Social';

var Navigation = React.createClass({
  render: function() {
    return (
      <div className="navigation">
        <div className="brand">
          <IndexLink to="/">
            <div className="logo"></div>
          </IndexLink>
        </div>
        <div className="links">
          <div className="link">
            <Link to="/menu" activeClassName="active">menu</Link>
          </div>
          <div className="link">
            <Link to="/about" activeClassName="active">about</Link>
          </div>
        </div>
        <Social/>
      </div>
    )
  }
});

export default Navigation;
