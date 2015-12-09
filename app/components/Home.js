import React from 'react';
import { Link } from 'react-router';
import Instagram from './Instagram';
import { Break, Bold, Note } from './Common';
import Footer from './Footer';

var Home = React.createClass({
  render: function() {
    return (
      <div className="home">
        <div>
          <Bold>C'est la Creme</Bold> is an online creme brulee shop, crafting quality desserts for lucky folks in the Vancouver area. Our goal is to source the freshest local ingredients and deliver an indulgence to your taste buds with every bite.
        </div>
        <Break/>
        <Instagram/>
        <Break/>
        <div>
          We operate solely through online purchases, market pop-ups, and catering for events and weddings.
        </div>
        <br/>
        <div>
          <Bold>How it works:</Bold> We take regular orders online throughout the week, with orders closing weekly at 8pm every Tuesday. Thursday is pickup day! Current pickup point is at the McDonalds parking lot next to the Main Skytrain station (1527 Main St, Vancouver, BC V6A 2W5). Pickup time is between 6pm - 7pm.
        </div>
        <br/>
        <Note>
          *Please bear with us as we are limited by the current size of our operations and may sell out!*
        </Note>
        <Break/>
        <div className="pickup">
          <Bold>Next scheduled pickup date:</Bold>
          <br/>
          <div className="pickup-date">
            <Bold>Thursday December 17th, 6pm - 7pm</Bold>
          </div>
        </div>
        <Break/>
        <div>
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
