import React from 'react';
import ReactDOM from 'react-dom';
import { Bold } from './Common';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactTransitionGroup from 'react-addons-transition-group';

var Answer = React.createClass({

  _setStyle: function(height) {
    let node = ReactDOM.findDOMNode(this);
    node.style.maxHeight = height;
  },

  componentWillEnter: function(cb) {
    console.log("-->> will Enter:!!", cb);
    this._setStyle("0");
    cb();
  },

  componentDidEnter: function() {
    console.log("-->> did enter");
    this._setStyle("1000px");
  },

  componentWillLeave: function(cb) {
    console.log("-->> will leave!");
    this._setStyle("1000px");
    cb();
  },

  componentDidLeave: function() {
    console.log("-->> did leave");
    this._setStyle("0");
  },

  render: function() {
    return (
      <div key="answer" className="answer">{this.props.children}</div>
    );
  }
});

var FAQ = React.createClass({
  getDefaultProps: function() {
    return {
      question: '?'
    };
  },

  getInitialState: function() {
    return {
      expanded: false
    };
  },

  toggleQuestion: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  render: function() {
    return (
      <div className={classNames("qa", {
        expanded: this.state.expanded
      })}>
        <div className="question" onClick={this.toggleQuestion}><Bold>{this.props.question}</Bold></div>
        <ReactTransitionGroup
          transitionName="answer"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.state.expanded ? <Answer>{this.props.children}</Answer> : null}
        </ReactTransitionGroup>
      </div>
    );
  }
});

export default FAQ;
