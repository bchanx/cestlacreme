import React from 'react';
import { Link } from 'react-router';
import Instagram from './Instagram';
import { Break } from './Common';
import Footer from './Footer';

var Home = React.createClass({
  render: function() {
    return (
      <div className="home">
        <div>
          <span className="bold">C'est la Creme</span> is a online creme brulee shop, crafting quality desserts for lucky folks in the Vancouver area. Our goal is to source the freshest local ingredients and deliver an indulgence to your taste buds with every bite.
        </div>
        <Break/>
        <Instagram/>
        <Break/>
        <div>
          We operate solely through online purchases, market pop-ups, and catering for events and weddings.
        </div>
        <Break/>
        <div>
          <span className="bold">How it works:</span> We take regular orders online throughout the week, with orders closing weekly at 8pm every Tuesday. Thursday is pickup day! Current pickup point is located at the McDonalds parking lot, next to the Main Skytrain station. 1527 Main St, Vancouver, BC V6A 2W5. 
        </div>
        <Break/>
        <div>
          Lastly, please bear with us as we are limited by the current size of our operations and may sell out!
          <br/>
          <br/>
          Interested? Check out our&nbsp;
          <Link to="/menu">menu</Link>
          &nbsp;and see what's available for ordering!
        </div>
        <Break/>
        <Footer/>
      </div>
    );
  }
})

export default Home;
