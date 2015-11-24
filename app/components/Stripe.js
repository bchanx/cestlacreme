import React from 'react';
import { ReactScriptLoaderMixin } from 'react-script-loader';

var Stripe = React.createClass({
  mixins: [ReactScriptLoaderMixin],

  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function() {
    this.setState({
      loading: false,
      error: !Stripe
    });
    if (Stripe) {
      console.log("-->> stripe good!", Stripe);
      console.log("-->> process.env:", process.env.STRIPE_TEST_KEY);
    }
  },

  onScriptError: function() {
    console.log("-->> ERROR!");
    this.setState({
      loading: false,
      error: true
    });
  },

  getInitialState: function() {
    return {
      loading: true,
      error: false
    };
  },

  render: function() {
    var test = this.state.loading ? 'Loading...' : this.state.error ? 'An Error Occured...' : 'STRIPE!';
    return (
      <div className="stripe">
        {test}
      </div>
    );
  }
});

export default Stripe;
