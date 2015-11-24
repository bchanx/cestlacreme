import React from 'react';
import { Break } from './Common';

var About = React.createClass({
  render: function() {
    return (
      <div className="about">
        <div>
          We're C'est la Creme! Started in 2015.
        </div>
        <Break/>
        <div>
          We take pride in supporting local farmers and using the best ingredients British Columbia has to offer.
          - Avalon dairy
          - Vanilla
          - Sugar
        </div>
        <Break/>
      </div>
    );
  }
});

export default About;
