import React from 'react';
import ReactDOM from 'react-dom';
import ReactTimerMixin from 'react-timer-mixin';
import { Bold } from './Common';
import classNames from 'classnames';

var FAQ = React.createClass({
  mixins: [ReactTimerMixin],

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

  questionExpanded: false,

  componentDidUpdate: function() {
    this.setTimeout(() => {
      if (this.questionExpanded) {
        let node = ReactDOM.findDOMNode(this);
        let content = node.parentNode.parentNode.parentNode;
        content.scrollTop = node.offsetTop - 10;
        document.body.scrollTop = node.offsetTop - 10;
      }
    }, 100);
  },

  toggleQuestion: function() {
    let expanded = !this.state.expanded;
    this.setState({
      expanded: expanded,
      classname: expanded ? 'expanded' : 'collapsed'
    });
    this.questionExpanded = expanded;
  },

  render: function() {
    return (
      <div className={classNames("qa", this.state.classname)}>
        <div className="question" onClick={this.toggleQuestion}>
          <Bold>{this.props.question}</Bold>
        </div>
        <div className="answer">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default FAQ;
