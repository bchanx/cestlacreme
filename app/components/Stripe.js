import React from 'react';
import ReactDOM from 'react-dom';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import ReactCreditCard from 'react-credit-card';
import request from 'superagent';
import classNames from 'classnames';
import { Break, Button } from './Common';

var StripeReact = React.createClass({
  mixins: [ReactScriptLoaderMixin],

  getDefaultProps: function() {
    return {
      pricing: null,
      selected: null,
      formParams: [{
        type: 'number',
        placeholder: 'Card number'
      }, {
        type: 'name',
        placeholder: 'Full name'
      }, {
        type: 'expiry',
        placeholder: 'MM/YY'
      }, {
        type: 'cvc',
        placeholder: 'CVC'
      }],
      cardDisclosure: 'We do not store any credit card information on our servers. All payments are securely handled with Stripe. Learn more at stripe.com/about.'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    let totalSelected = Object.keys(nextProps.selected).map(type => nextProps.selected[type].value)
      .reduce((a, b) => a + b);
    this.setState({
      totalSelected: totalSelected
    });
  },

  getInitialState: function() {
    return {
      loading: true,
      loadingError: false,
      totalSelected: 0,
      showPayments: false,
      showSuccess: false,
      submitInProgress: false,
      form: {
        number: '',
        name: '',
        expiry: '',
        cvc: ''
      },
      focused: 'number',
      error: null
    };
  },

  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function() {
    // TODO: prod/test key
    if (!this._.unmounted) {
      var ready = Stripe && process.env.STRIPE_TEST_PUBLISHABLE_KEY;
      this.setState({
        loading: false,
        loadingError: !ready
      });
      if (ready) {
        Stripe.setPublishableKey(process.env.STRIPE_TEST_PUBLISHABLE_KEY);
      }
    }
  },

  onScriptError: function() {
    console.log("-->> ERROR!");
    if (!this._.unmounted) {
      this.setState({
        loading: false,
        loadingError: true
      });
    }
  },

  // Internal state
  _: {
    unmounted: false,
    paymentsToggleClicked: false,
    input: {
      number: null,
      name: null,
      expiry: null,
      cvc: null
    }
  },

  componentWillUnmount: function() {
    this._.unmounted = true;
  },

  componentDidUpdate: function() {
    if (this._.paymentsToggleClicked) {
      if (this.state.showPayments) {
        let node = ReactDOM.findDOMNode(this).parentNode.parentNode;
        node.scrollTop = node.scrollHeight;
        let focus = this.state.error && this.state.error.type || 'number';
        console.log('-->> FOCUS:', focus, this.state.error);
        if (this._.input[focus]) {
          this._.input[focus].focus();
        }
      }
      this._.paymentsToggleClicked = false;
    }
  },

  isValidOrder: function() {
    return this.state.totalSelected >= this.props.pricing.minimum && this.state.totalSelected <= this.props.pricing.maximum;
  },

  togglePayments: function(event) {
    event && event.preventDefault();
    if (this.isValidOrder()) {
      this._.paymentsToggleClicked = true;
      this.setState({
        showPayments: !this.state.showPayments
      });
    }
    else {
      // TODO show button error
      console.error("-->> total not correct", this.state.totalSelected);
    }
  },

  onFormChange: function(type, event) {
    if (!this.state.submitInProgress) {
      let form = this.state.form;
      form[type] = event.target.value;
      this.setState(form);
    }
  },

  onFocusChange: function(type) {
    if (!this.state.submitInProgress) {
      this.setState({
        focused: type
      });
    }
  },

  validateForm: function() {
    let error = null;
    if (!Stripe.card.validateCardNumber(this.state.form.number)) {
      error = {
        type: 'number',
        message: 'Card number is invalid.'
      };
    }
    else if (!this.state.form.name) {
      error = {
        type: 'name',
        message: 'Name is invalid.'
      };
    }
    else if (!Stripe.card.validateExpiry(this.state.form.expiry)) {
      error = {
        type: 'expiry',
        message: 'Expiry is invalid.'
      };
    }
    else if (!Stripe.card.validateCVC(this.state.form.cvc)) {
      error = {
        type: 'cvc',
        message: 'CVC is invalid.'
      };
    }
    // Returns error if any, otherwise null
    return error;
  },

  onCreateResponse: function(status, response) {
    if (response.error) {
      // Stripe error
      this.setState({
        submitInProgress: false
      });
      console.log("-->> SOMETHING WENT WRONG ...");
    }
    else {
      // Send form data to server for charge
      request.post(window.location.origin + '/stripe/order')
        .send({
          stripeToken: response.id,
          created: response.created,
          livemode: response.livemode
        })
        .accept('json')
        .end((error, response) => {
          this.setState({
            submitInProgress: false,
            showSuccess: true,
            showPayments: false
          });
        });
    }
  },

  submitOrder: function(event) {
    event && event.preventDefault();
    console.log("-->> submit order!", this.state.form);
    let error = this.validateForm();
    if (error) {
      console.log("-->> things are invalid...", error);
      this.setState({
        error: error
      });
      if (this._.input[error.type]) {
        this._.input[error.type].focus();
      }
    }
    else {
      // Things look good, submit!
      console.log("-->> CREATE TOKEN!!");
      this.setState({
        submitInProgress: true
      });
      // TODO turn this on for prod
      if (process.env.NODE_ENV === 'development') {
        Stripe.card.createToken({
          number: this.state.form.number,
          name: this.state.form.name,
          exp: this.state.form.expiry,
          cvc: this.state.form.cvc
        }, this.onCreateResponse);
      }
    }
  },

  onBlurChange: function(type) {
    if (!this.state.submitInProgress && type === 'cvc') {
      this.setState({
        focused: 'number'
      });
    }
  },

  onFormMount: function(type, input) {
    if (input) {
      this._.input[type] = input;
    }
  },

  render: function() {
    let formParams = this.props.formParams.map(p => {
      let type = p.type;
      let placeholder = p.placeholder;
      let onChangeHandler = this.onFormChange.bind(this, type);
      let onFocusHandler = this.onFocusChange.bind(this, type);
      let onBlurHandler = this.onBlurChange.bind(this, type);
      let formMountHandler = this.onFormMount.bind(this, type);
      return <input key={type} className={classNames("stripe-input", {
        error: this.state.error && this.state.error.type === type
      })} text="text" placeholder={placeholder} name={type} value={this.state.form[type]} onChange={onChangeHandler} onFocus={onFocusHandler} onBlur={onBlurHandler} ref={formMountHandler}/>;
    });
    let payment = (
      <div>
        <div className={classNames("stripe-payment", {
          active: this.state.showPayments
        })}>
          <div className="stripe-card">
            <ReactCreditCard
              number={this.state.form.number}
              name={this.state.form.name}
              expiry={this.state.form.expiry}
              cvc={this.state.form.cvc}
              focused={this.state.focused}
              shinyAfterBack={this.props.cardDisclosure}/>
          </div>
          <form className="stripe-form">
            {formParams}
            <Button className="btn-success" onClick={this.submitOrder}>Place Order</Button>
            <Button className="btn-default" onClick={this.togglePayments}>Cancel</Button>
          </form>
        </div>
        { this.state.showSuccess ?
          <div>
            Success!
            <div onClick={this.togglePayments}>Make another order?</div>
          </div> :
          !this.state.showPayments ?
          <div className="stripe-ready">
            <Button className="btn-default" onClick={this.togglePayments} disabled={!this.isValidOrder()}>Ready to order?</Button>
          </div> : null }
      </div>
    );
    return (
      <div className="stripe">
        { this.state.loading ? 'Loading...' : this.state.loadingError ? 'An Error Occured...' : payment }
      </div>
    );
  }
});

export default StripeReact;
