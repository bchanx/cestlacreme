import React from 'react';
import request from 'superagent';

var Instagram = React.createClass({
  getInitialState: function() {
    return {
      recent: []
    };
  },
  componentDidMount: function() {
    request.get(window.location.origin + '/instagram/recent')
      .accept('json')
      .end((error, response) => {
        if (response && response.body) {
          this.setState({ recent: response.body });
        }
      });
  },
  render: function() {
    var thumbnails = this.state.recent.map(r => {
      return (
        <a className="instagram-link" href={r.link} target="_blank" key={r.link}>
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
