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

export var Carousel = React.createClass({
  mixins: [ReactTimerMixin],

  componentDidMount: function() {
    this.nextImageTimeout();
  },

  nextImageTimeout: function() {
    this.setTimeout(() => {
      if (!this.state.imageHovered) {
        this.nextImage();
        this.nextImageTimeout();
      }
      else {
        this.setState({
          transitionPending: true
        });
      }
    }, this.props.timeout);
  },

  nextImage: function() {
    let newState = {
      transitionPending: false
    };
    if (this.props.images.length) {
      let newIndex = (this.state.currentIndex + 1) % this.props.images.length;
      newState.currentIndex = newIndex;
    }
    this.setState(newState);
  },

  getDefaultProps: function() {
    return {
      images: [],
      timeout: 5000,
      startIndex: 0
    };
  },

  getInitialState: function() {
    return {
      currentIndex: this.props.startIndex,
      imageHovered: false,
      transitionPending: false
    };
  },

  onMouseOver: function() {
    this.setState({
      imageHovered: true
    });
  },

  onMouseLeave: function() {
    this.setState({
      imageHovered: false
    });
    if (this.state.transitionPending) {
      this.nextImage();
      this.nextImageTimeout();
    }
  },

  render: function() {
    let images = this.props.images.map((imgURL, idx) => {
      let backgroundImage = {
        backgroundImage: 'url(' + imgURL + ')'
      };
      return (
        <div key={imgURL} className={classNames("carousel-image", {
          active: idx === this.state.currentIndex
        })} style={backgroundImage}></div>
      );
    });
    return (
      <div className="carousel-images">
        {images}
      </div>
    );
  }
});
