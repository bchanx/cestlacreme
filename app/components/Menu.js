import React from 'react';
import { Break } from './Common';
import Stripe from './Stripe';
import Selection from './Selection';

var CONSTRAINTS = {
  price: 5.00,
  minimum: 4,
  maximum: 12
};

var Menu = React.createClass({
  getInitialState: function() {
    return {
      selected: {
        vanilla: 0,
        matcha: 0,
        earlgrey: 0
      }
    };
  },

  onSelectionChange: function(name, val) {
    console.log("-->> selection changed:", name, val);
    let selected = this.state.selected;
    selected[name] = val.value;
    this.setState(selected);
  },

  render: function() {
    return (
      <div className="menu">
        <div>
          Our creme brulee's are sold at a flat rate of ${CONSTRAINTS.price} each. However due to the nature of our business, we require at least {CONSTRAINTS.minimum} brulee's per order, meaning a <span className="bold">minimum ${CONSTRAINTS.price * CONSTRAINTS.minimum} purchase</span>.
          <br/>
          <br/>
          Flavors can be mixed and matched to your preference.
          <br/>
          <br/>
          (For orders of more than a dozen, please <a href="mailto:cestlacreme@gmail.com">email us</a> to set up a specialty order)
        </div>
        <Break/>
        <Selection constraints={CONSTRAINTS} selected={this.state.selected} onSelectionChange={this.onSelectionChange}/>
        <Break/>
        <div>
          You have currently selected: {this.state.selected.vanilla} Vanilla, {this.state.selected.matcha} Matcha, and {this.state.selected.earlgrey} Earl Grey.
        </div>
        <Break/>
        <Stripe/>
      </div>
    );
  }
});

export default Menu;
