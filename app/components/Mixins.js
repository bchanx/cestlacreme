export var ScrollToMixin = {
  componentDidMount: function() {
    this._scroll.requestAnimationFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback, element, delay) {
        this.setTimeout(callback, delay || (1000/60), new Date().getTime());
      };
    })();
  },

  _easing: function(x) {
    return (x < 0.5) ? Math.pow(x*2, 2)/2 : 1 - Math.pow((1-x) * 2, 2)/2;
  },

  _scroll: {
    start: null,
    cancel: false,
    element: null,
    delta: 0,
    progress: 0,
    percent: 0,
    startY: 0,
    currentY: 0,
    targetY: 0,
    duration: 1000,
    requestAnimationFrame: null
  },

  _animateScroll: function(timestamp) {
    let s = this._scroll;
    if (s.cancel) {
      return;
    }
    if (s.start === null) {
      s.start = timestamp;
    }
    s.progress = timestamp - s.start;
    s.percent = (s.progress >= s.duration) ? 1 : this._easing(s.progress / s.duration);
    s.currentY = s.startY + Math.ceil(s.delta * s.percent);
    s.element.scrollTop = s.currentY;

    if (s.percent < 1) {
      this._scroll.requestAnimationFrame.call(window, this._animateScroll);
    }
  },

  scrollTo: function(element, y, duration) {
    let s = this._scroll;
    s.start = null;
    s.cancel = false;
    s.element = element;
    s.startY = element.scrollTop;
    s.targetY = y;
    s.delta = Math.round(s.targetY - s.startY);
    s.duration = duration;
    s.progress = 0;
    if (this._scroll.requestAnimationFrame) {
      this._scroll.requestAnimationFrame.call(window, this._animateScroll);
    }
  }
};
