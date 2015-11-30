import React from 'react';
import { Break, Bold } from './Common';
import Stripe from './Stripe';
import MenuItems from './MenuItems';
import OrderSummary from './OrderSummary';

var PRICING = {
  price: 5.00,
  minimum: 4,
  maximum: 12
};

var Menu = React.createClass({
  getInitialState: function() {
    return {
      selected: {
        vanilla: {
          name: 'Vanilla',
          value: 0
        },
        matcha: {
          name: 'Matcha',
          value: 0
        },
        earlgrey: {
          name: 'Earl Grey',
          value: 0
        }
      }
    };
  },

  onSelectionChange: function(name, val) {
    let selected = this.state.selected;
    selected[name].value = val.value;
    this.setState(selected);
  },

  render: function() {
    return (
      <div className="menu">
        <div>
          Our creme brulee's are sold at a flat rate of ${PRICING.price} each. However due to the nature of our business, we require at least {PRICING.minimum} brulee's per order, meaning a <Bold>minimum ${PRICING.price * PRICING.minimum} purchase</Bold>.
          <br/>
          <br/>
          Flavors can be mixed and matched to your preference.
          <br/>
          <br/>
          (For orders of more than a dozen, please <a href="mailto:cestlacreme@gmail.com">email us</a> to set up a specialty order.)
        </div>
        <Break/>
        <MenuItems pricing={PRICING} selected={this.state.selected} onSelectionChange={this.onSelectionChange}/>
        <OrderSummary pricing={PRICING} selected={this.state.selected}/>
        <Break/>
        <Stripe pricing={PRICING} selected={this.state.selected}/>
      </div>
    );
  }
});

export default Menu;
