import React from 'react';
import Instagram from './Instagram';

var Home = React.createClass({
  render: function() {
    return (
      <div className="home">
        Hello from home.
        <Instagram />
      </div>
    );
  }
})

export default Home;
