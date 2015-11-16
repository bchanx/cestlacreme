import React from 'react';
import request from 'request';

var Instagram = React.createClass({
  getInitialState: function() {
    return {
      recent: []
    };
  },
  componentDidMount: function() {
    request({
      method: 'GET',
      json: true,
      url: window.location.origin + '/instagram/recent'
    }, (error, response, body) => {
      this.setState({ recent: body });
    });
  },
  render: function() {
    console.log("-->> this.state:", this.state);
    var thumbnails = this.state.recent.map(r => {
      return (
        <a href={r.link} target="_blank" key={r.link}>
          <div className="instagram-thumbnail">
            <img src={r.image.url}/>
          </div>
        </a>
      );
    });
    return (
      <div className="instagram">
        {thumbnails}
      </div>
    );
  }
});

export default Instagram;
