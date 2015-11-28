import React from 'react';
import request from 'superagent';
import { Loading } from './Common';
import Carousel from './Carousel';
import ImageOverlay from './ImageOverlay';

var Instagram = React.createClass({
  getInitialState: function() {
    return {
      recent: [],
      loading: true,
      showDefault: false,
      imageOverlayShow: false,
      imageOverlayStartIndex: 0
    };
  },

  componentDidMount: function() {
    request.get(window.location.origin + '/instagram/recent')
      .accept('json')
      .end((error, response) => {
        let newState = {
          recent: [],
          loading: false,
          showDefault: true
        };
        if (response && response.body) {
          newState.recent = response.body;
        }
        if (newState.recent.length) {
          newState.showDefault = false;
        }
        this.setState(newState);
      });
  },

  openOverlay: function(index) {
    console.log("-->> index:", index);
    this.setState({
      imageOverlayShow: true,
      imageOverlayStartIndex: index
    });
  },

  onOverlayClose: function() {
    this.setState({
      imageOverlayShow: false
    });
  },

  render: function() {
    let images = [];
    let thumbnails = this.state.recent.map((r, index) => {
      images.push(r.image.url);
      let onClickHandler = this.openOverlay.bind(this, index);
      return (
//        <a className="instagram-link" href={r.link} target="_blank" key={r.link}>
        <div className="instagram-link" key={r.link} onClick={onClickHandler}>
          <div className="instagram-thumbnail">
            <img src={r.image.url}/>
          </div>
        </div>
//        </a>
      );
    });
    let defaultImage = (
      <img className="default-thumbnail" src="/images/default-brulee-low.png"/>
    );
    return (
      <div className="instagram">
        {this.state.loading ? <Loading size="large"/> : this.state.showDefault ? defaultImage : thumbnails}
        <div className="instagram-carousel">
          <Carousel images={images}/>
        </div>
        <ImageOverlay
          images={images}
          show={this.state.imageOverlayShow}
          startIndex={this.state.imageOverlayStartIndex}
          onClose={this.onOverlayClose}/>
      </div>
    );
  }
});

export default Instagram;
