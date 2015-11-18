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
          <span className="bold">How it works:</span> We accept online orders each week between Monday to Thursday. We gather the necessary ingredients on Friday, and make the magic happen on Saturday. Sunday, the happy little brulee's will get delivered right to your doorstep.
        </div>
        <Break/>
        <div>
          We take pride in supporting local farmers and using the best ingredients British Columbia has to offer.
          - Avalon dairy
          - granville island vanilla
          - specialized sugar?
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
