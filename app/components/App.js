import React from 'react';
import Navigation from './Navigation';

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <Navigation/>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default App;
