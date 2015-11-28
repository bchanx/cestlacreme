import React from 'react';

export var Break = React.createClass({
  render: function() {
    return (
      <div className="break"></div>
    );
  }
});

export var Bold = React.createClass({
  render: function() {
    return (
      <span className="bold">{this.props.children}</span>
    );
  }
});

export var Note = React.createClass({
  render: function() {
    return (
      <span className="note">{this.props.children}</span>
    );
  }
});
