import React from 'react';

var Menu = React.createClass({
  render: function() {
    return (
      <div className="menu">
        <div>
          Vanilla
        </div>
        <div>
          Matcha
        </div>
        <div>
          Earl Grey
        </div>
        <div>
          Our creme brulee's are sold at a flat rate of $5 each. Because of logistics, we are currently only taking a minimum order of four brulee's with every purchase. Therefore, each order must be a minimum $20 purchase.
          <br/>
          Flavors can be mixed and matched to your preference.
        </div>
        <div>
          Ready to order? Pay with Stripe.
        </div>
      </div>
    );
  }
});

export default Menu;
