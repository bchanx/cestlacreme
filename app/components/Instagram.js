import React from 'react';
import request from 'superagent';
import { Loading } from './Common';

var Instagram = React.createClass({
  getInitialState: function() {
    return {
      recent: [],
      loading: true,
      showDefault: false
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
  render: function() {
    let thumbnails = this.state.recent.map(r => {
      return (
        <a className="instagram-link" href={r.link} target="_blank" key={r.link}>
          <div className="instagram-thumbnail">
            <img src={r.image.url}/>
          </div>
        </a>
      );
    });
    let defaultImage = (
      <img className="default-thumbnail" src="/images/default-brulee-low.png"/>
    );
    return (
      <div className="instagram">
        {this.state.loading ? <Loading size="large"/> : this.state.showDefault ? defaultImage : thumbnails}
      </div>
    );
  }
});

export default Instagram;
