import React from 'react';
import { ReactScriptLoaderMixin } from 'react-script-loader';

var Stripe = React.createClass({
  mixins: [ReactScriptLoaderMixin],

  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function() {
    console.log("-->> HI STRIPE:", Stripe);
  },

  onScriptError: function() {
    console.log("-->> ERROR!");
  },

  render: function() {
    return (
      <div className="stripe">
        STRIPE
      </div>
    );
  }
});

export default Stripe;
