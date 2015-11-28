import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';

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

export var Loading = React.createClass({
  getDefaultProps: function() {
    return {
      size: 'small'
    };
  },

  render: function() {
    return (
      <div className={classNames("loading", this.props.size)}>
        <span className="ion-load-c"></span>
      </div>
    );
  }
});
