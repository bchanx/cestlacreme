import React from 'react';
import classNames from 'classnames';

var ImageOverlay = React.createClass({
  getDefaultProps: function() {
    return {
      show: false,
      images: [],
      startIndex: 0,
      onClose: null
    };
  },

  getInitialState: function() {
    return {
      currentIndex: this.props.startIndex
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      currentIndex: newProps.startIndex
    });
  },

  componentDidMount: function() {
    if (document) {
      document.addEventListener('keydown', this.handleKeydown, false);
      document.addEventListener('click', this.handleClick, false);
    }
  },

  componentWillUnmount: function() {
    if (document) {
      document.removeEventListener('keydown', this.handleKeydown, false);
      document.removeEventListener('click', this.handleClick, false);
    }
  },

  handleClick: function(event) {
    if (event.target.classList.contains('image-overlay') ||
        event.target.classList.contains('image-overlay-container')) {
      // Clicked on empty space, close overlay
      this.close();
    }
  },

  handleKeydown: function(event) {
    if (this.props.show) {
      if (event.keyCode === 27) {
        // Esc key
        this.close();
      }
      else if (event.keyCode === 37) {
        // Left
        this.gotoPrev();
      }
      else if (event.keyCode === 39) {
        // Right
        this.gotoNext();
      }
    }
  },

  close: function() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  },

  gotoNext: function() {
    if (this.props.images.length) {
      this.setState({
        currentIndex: (this.state.currentIndex + 1) % this.props.images.length
      });
    }
  },

  gotoPrev: function() {
    if (this.props.images.length) {
      this.setState({
        currentIndex: (this.props.images.length + (this.state.currentIndex - 1)) % this.props.images.length
      });
    }
  },

  render: function() {
    let backgroundImage = this.props.images.length > this.state.currentIndex ? {
      backgroundImage: 'url(' + this.props.images[this.state.currentIndex] + ')'
    } : null;
    return (
      <div className={classNames("image-overlay", {
        active: this.props.show
      })}>
        <div className="image-overlay-close" onClick={this.props.onClose}>
          <span className="ion-close"></span>
        </div>
        <div className="image-overlay-container">
          <div className="chevron left" onClick={this.gotoPrev}><span className="ion-chevron-left"></span></div>
          <div className="image" style={backgroundImage}></div>
          <div className="chevron right" onClick={this.gotoNext}><span className="ion-chevron-right"></span></div>
        </div>
      </div>
    );
  }
});

export default ImageOverlay;
