import React from 'react';
import { Break } from './Common';
import Stripe from './Stripe';

var Menu = React.createClass({
  render: function() {
    return (
      <div className="menu">
        <div>
          Vanilla
        </div>
        <Break/>
        <div>
          Matcha
        </div>
        <Break/>
        <div>
          Earl Grey
        </div>
        <Break/>
        <div>
          Our creme brulee's are sold at a flat rate of $5 each. However due to logistics, we are requiring a minimum order of four brulee's with every purchase. Therefore, each order must be a <span className="bold">minimum $20 purchase</span>.
          <br/>
          <br/>
          Flavors can be mixed and matched to your preference.
        </div>
        <Break/>
        <div>
          Ready to order? Pay with Stripe.
        </div>
        <Break/>
        <Stripe/>
      </div>
    );
  }
});

export default Menu;
